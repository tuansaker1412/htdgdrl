class Api::V1::Admins::ClassNamesController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action :find_class_name, only: [:show, :update]

  respond_to :json

  def index
    class_names = ClassName.search(name_cont: params[:keyword])
      .result.paginate page: params[:page],per_page: Settings.per_page
    render json: {code: 1, data: class_names, per_page: Settings.per_page,
      page: params[:page], total: class_names.total_entries, message: "success"}
  end

  def show
    render json: {code: 1, data: @class_name, message: "success"}
  end

  def create
    check_exist = ClassName.where(name: params[:class_name][:name])
    if check_exist.blank?
      class_name = ClassName.new class_name_params
      if class_name.save
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def update
    check_exist = ClassName.where(name: params[:class_name][:name])
      .where("id != ?", params[:id])

    if check_exist.blank?
      if @class_name.update_attributes class_name_params
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def destroy
    if User.where(class_name_id: params[:id]).present?
      render json: {code: 2, message: "Không thể xóa"}
      return
    end

    class_name = ClassName.find_by id: params[:id]
    if class_name.destroy
      render json: {code: 1, message: "Thành công"}
    else
      render json: {code: 2, message: "Thất bại"}
    end
  end

  private

  def class_name_params
    params.require(:class_name).permit(:name)
  end

  def find_class_name
    @class_name = ClassName.find_by id: params[:id]
  end
end
