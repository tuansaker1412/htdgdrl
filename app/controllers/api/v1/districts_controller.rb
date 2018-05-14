class Api::V1::DistrictsController < ApplicationController
  before_action :load_user_authentication
  skip_before_filter :verify_authenticity_token

  respond_to :json

end
