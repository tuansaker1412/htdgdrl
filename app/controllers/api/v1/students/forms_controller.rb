class Api::V1::Students::FormsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action :total, only: [:create, :update]
  before_action :find_form, only: [:show, :update]

  respond_to :json

  def index
    forms = Form.where(user_id: current_user.id)
    render json: {code: 1, data: forms, message: "success"}
  end

  def show
    render json: {code: 1, data: @form, message: "success"}
  end

  def create
    params[:form][:total] = @total
    params[:form][:user_id] = current_user.id
    params[:form][:status] = current_user.role
    check_exist = Form.where("user_id = ? and session = ? and year = ?", current_user.id,
      params[:form][:session], params[:form][:year])
    if check_exist.blank?
      form = Form.new form_params
      if form.save
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def update
    params[:form][:total] = @total
    check_exist = Form.where("user_id = ? and session = ? and year = ?", current_user.id,
      params[:form][:session], params[:form][:year])
      .where("id != ?", params[:id])

    if check_exist.blank?
      if @form.update_attributes form_params
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def destroy
    if Form.where("id = ? and status != ?", params[:id], "student").present?
      render json: {code: 2, message: "Không thể xóa"}
      return
    end

    form = Form.find_by id: params[:id]
    if form.destroy
      render json: {code: 1, message: "Thành công"}
    else
      render json: {code: 2, message: "Thất bại"}
    end
  end

  private

  def form_params
    params.require(:form).permit(:status, :session, :year, :total, :user_id, :form1,
      :form2, :form3, :form4, :form5, :form6, :form7, :form8, :form9, :form10,
      :form11, :form12, :form13, :form14, :form15, :form16, :form17, :form18,
      :form19, :form20, :form21, :form22, :form23)
  end

  def find_form
    @form = Form.find_by id: params[:id]
  end

  def total
    @total = 70 - params[:form][:form1] - params[:form][:form2] - params[:form][:form3] - params[:form][:form4] - params[:form][:form5] - params[:form][:form6] - params[:form][:form7] - params[:form][:form8] - params[:form][:form9] - params[:form][:form10] - params[:form][:form11] - params[:form][:form14] - params[:form][:form15] - params[:form][:form16] + params[:form][:form12] + params[:form][:form13] + params[:form][:form17] + params[:form][:form18] + params[:form][:form19] + params[:form][:form20] + params[:form][:form21] + params[:form][:form22] + params[:form][:form23]
  end
end
