class Api::V1::SessionsController < ApplicationController
  before_action :load_user_authentication
  skip_before_filter :verify_authenticity_token

  respond_to :json

  def create
    auth_token = JsonWebToken.encode(user_id: @user.id)
    if @user.role != "admin"
      render json: {code: 1, message: t("devise.confirmations.signed_in"),
        user: @user, token: auth_token, class_name: @user.class_name.name}, status: 200
    else
      render json: {code: 1, message: t("devise.confirmations.signed_in"),
        user: @user, token: auth_token}, status: 200
    end
  end

  private
  def user_params
    # params.require(:user).permit :username, :password
    params.require(:user).permit :email, :password
  end
end
