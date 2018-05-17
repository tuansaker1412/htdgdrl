class Api::V1::Admins::FormsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token

  respond_to :json

  def index
    @forms = Form.where("status = ?", 3)
      .paginate page: params[:page],per_page: Settings.per_page
  end
end
