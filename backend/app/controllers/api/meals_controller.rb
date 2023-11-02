module Api
  class MealsController < ApplicationController
    before_action :set_meal, only: [:show, :update]

    def index
      meals = Meal.all.order(id: :asc).page(params[:page]).per(params[:per_page])
      render json: meals
    end

    def show
      render json: @meal
    end

    def update
      if @meal.update(meal_params)
        render json: @meal
      else
        render json: { errors: @meal.errors }, status: :unprocessable_entity
      end
    rescue ActionController::ParameterMissing => e
      render json: { error: "Missing parameter: #{e.param}" }, status: :bad_request
    end

    private

    def meal_params
      params.require(:meal).permit(:name)
    end

    def set_meal
      @meal = Meal.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Meal not found' }, status: :not_found
    end
  end
end
