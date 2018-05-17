class Api::V1::FormsController < ApplicationController
  # before_action :load_user_authentication
  skip_before_filter :verify_authenticity_token

  respond_to :json

  def send_form
    form = Form.find_by id: params[:form][:id]
    status = Form.statuses[form.status] + 1
    if form.update_attributes status: status
      render json: {code: 1, message: "Thành công"}
    else
      render json: {code: 2, message: "Thất bại"}
    end
  end

  def back_form
    form = Form.find_by id: params[:form][:id]
    status = Form.statuses[form.status] - 1
    if form.update_attributes status: status
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
end
