class Api::V1::Admins::StudentsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action :find_student, only: [:show, :update]

  respond_to :json

  def index
    @students = User.where("role in (?)", [0, 1]).search(last_name_cont: params[:keyword])
      .result.paginate page: params[:page],per_page: Settings.per_page
  end

  def show
    render json: {code: 1, data: @student, message: "success"}
  end

  def create
    if User.where("class_name_id = ? and role = ?", params[:student][:class_name_id], params[:student][:role]).present?
      render json: {code: 2, message: "Đã có lớp trưởng của lớp này"}
      return
    end

    check_exist = User.where("email = ? or mssv = ?", params[:student][:email], params[:student][:mssv])

    if check_exist.blank?
      student = User.new student_params
      if student.save
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def update
    if User.where("class_name_id = ? and role = ?", params[:student][:class_name_id], params[:student][:role]).present?
      render json: {code: 2, message: "Đã có lớp trưởng của lớp này"}
      return
    end

    check_exist = User.where("email = ? or mssv = ?", params[:student][:email], params[:student][:mssv])
      .where("id != ?", params[:id])

    if check_exist.blank?
      if @student.update_attributes student_params
        render json: {code: 1, message: "Thành công"}
      else
        render json: {code: 2, message: "Thất bại"}
      end
    else
      render json: {code: 2, message: "Trùng lặp"}
    end
  end

  def destroy
    student = User.find_by id: params[:id]
    if student.destroy
      render json: {code: 1, message: "Thành công"}
    else
      render json: {code: 2, message: "Thất bại"}
    end
  end

  private

  def student_params
    params.require(:student).permit(:email, :password, :password_confirmation,
      :first_name, :last_name, :role, :class_name_id, :birthday, :mssv)
  end

  def find_student
    @student = User.find_by id: params[:id]
  end
end
