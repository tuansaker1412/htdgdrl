class Api::V1::SuperStudents::FormsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token

  respond_to :json

  def index
    user_id = User.where("role = ? and class_name_id = ?", "student", current_user.class_name_id).pluck(:id)
    @forms = Form.where("user_id in (?) and status = ?", user_id, 1)
      .paginate page: params[:page],per_page: Settings.per_page
  end
end
