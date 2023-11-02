module Api
  class UsersController < ApplicationController
    before_action :set_users, only: [:index]
    before_action :set_user, only: [:update_daily_calorie_limit]

    def index
      @users = policy_scope(User).order(id: :asc).page(params[:page]).per(params[:per_page])
      render json: @users
    end

    def current_logged_in_user
      render json: { current_user: @current_user, role: @current_user.role.name }
    end

    def update_daily_calorie_limit
      authorize @user

      if @user.update(daily_calorie_limit: calorie_limit_params[:daily_calorie_limit])
        render json: { message: 'Daily calorie limit updated successfully.' }
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def invite_friend
      new_user = User.new(
        name: invite_params[:name],
        email: invite_params[:email],
        role: @current_user.role,
        password: SecureRandom.hex(10)
      )

      if new_user.save!
        render json: new_user
      else
        render json: { error: 'User Invite Failed' }, status: :unauthorized
      end
    end

    private

    def set_users
      @users = User.joins(:role).where(roles: { name: 'user' })
    end

    def set_user
      @user = User.find(params[:id])
    end

    def invite_params
      params.require(:user).permit(:name, :email)
    end

    def calorie_limit_params
      params.require(:user).permit(:daily_calorie_limit)
    end
  end
end
