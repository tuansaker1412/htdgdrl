class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception,
    if: Proc.new {|c| c.request.format != "application/json"}
  protect_from_forgery with: :null_session,
    if: Proc.new {|c| c.request.format == "application/json"}

  require "jsonwebtoken"
  respond_to :json, if: Proc.new {|c| c.request.format == "application/json"}

  def authenticate_request!
    token = request.headers['Authorization'].split(' ').last rescue nil
    payload = token.nil? ? nil : JsonWebToken.decode(token)
    if payload.nil? || !JsonWebToken.valid_payload(payload.first)
      render json: {code: 0,
        message: "Bạn cần phải đăng nhập trước khi tiếp tục."}, status: 401
      return
    end
    @current_user = User.find_by_id payload.first['user_id']
    @current_user = User.find_by id: payload.first["user_id"]
  end

  def load_user_authentication
    @user = User.find_by email: user_params[:email]
    if !@user
      render json: {code: 0,
        message: t("devise.failure.not_found_in_database")}, status: 200
    else
      if @user.locked_at.nil?
        unless @user.valid_password?(user_params[:password])
          @user.update_columns(failed_attempts: @user.failed_attempts + 1)
          if @user.failed_attempts == Settings.max_failed_attempts - 1
            render json: {code: 0,
              message: "Bạn có thêm 1 lần thử trước khi bị khóa tài khoản"}, status: 200
          elsif @user.failed_attempts >= Settings.max_failed_attempts
            @user.lock_access!
            render json: {code: 0, message: "Tài khoản của bạn đã bị khóa. Truy cập email để được hướng dẫn mở khóa tài khoản"}
          else
            render json: {code: 0,
              message: t("devise.failure.not_found_in_database")}, status: 200
          end
        else
          @user.update_columns(failed_attempts: 0)
        end
      else
        render json: {code: 3, message: "Tài khoản của bạn đã bị khóa"}
      end
    end
  end
end
