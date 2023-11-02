module Api
  class AuthenticateController < ApplicationController
    skip_before_action :authenticate_request

    def authenticate
      command = AuthenticateUser.call(params[:email])

      if command.success?
        render json: { auth_token: command.result }
      else
        render json: { error: command.errors }, status: :unauthorized
      end
    end

    def register
      new_user = User.new(user_params)
      if new_user.save
        command = AuthenticateUser.call(new_user.email)
        if command.success?
          render json: { auth_token: command.result }
        else
          render json: { error: command.errors }, status: :unauthorized
        end
      else
        render json: { error: 'Registeration Failed - User already exist.' }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email).merge(password: SecureRandom.hex(10))
    end
  end
end
