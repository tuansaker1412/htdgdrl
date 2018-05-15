class Api::V1::Users::UsersController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token

  respond_to :json

  def update
    user = @current_user
    if user.valid_password?(params[:current_password])
      user.assign_attributes password: params[:new_password]
      if user.save
        render json: {code: 1, message: t("devise.passwords.updated")}
      else
        render json: {code: 2, message: t("devise.passwords.updated_not_active")}
      end
    else
      render json: {code: 2, message: t("devise.passwords.confirmation")}
    end
  end
end
