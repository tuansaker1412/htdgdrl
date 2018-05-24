class Api::V1::Admins::UsersController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action :find_user, only: [:show, :update]

  respond_to :json

  def index
    @users = User.search(first_name_or_last_name_cont: params[:keyword])
      .result.paginate page: params[:page],per_page: Settings.per_page
  end

  def show
    render json: {code: 1, data: @user, message: "success"}
  end

  def create
    if params[:user][:role] == 1 && User.where("class_name_id = ? and role = ?", params[:user][:class_name_id], 1).present?
      render json: {code: 2, message: "Đã có lớp trưởng của lớp này"}
      return
    end

    check_exist = User.where("email = ? or mssv = ?", params[:user][:email], params[:user][:mssv])

    if check_exist.blank?
      user = User.new user_params
      if user.save
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def update
    if params[:user][:role] == 1 && User.where("class_name_id = ? and role = ?", params[:user][:class_name_id], 1)
      .where("id != ?", params[:user][:id]).present?
      render json: {code: 2, message: "Đã có lớp trưởng của lớp này"}
      return
    end

    check_exist = User.where("email = ? or mssv = ?", params[:user][:email], params[:user][:mssv])
      .where("id != ?", params[:id])

    if check_exist.blank?
      if @user.update_attributes user_params
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def destroy
    user = User.find_by id: params[:id]
    if user.destroy
      render json: {code: 1, message: "Thành công"}
    else
      render json: {code: 2, message: "Thất bại"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation,
      :first_name, :last_name, :role, :class_name_id, :birthday, :mssv)
  end

  def find_user
    @user = User.find_by id: params[:id]
  end
end
