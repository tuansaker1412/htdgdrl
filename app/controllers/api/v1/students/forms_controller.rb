class Api::V1::Students::FormsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token

  respond_to :json

  def index

  end

  def create

  end

  private

  def form_params
    params.require(:form).permit(:status, :session, :year, :form, :total, :user_id)
  end
end
