module Api
  class FoodEntriesController < ApplicationController
    before_action :set_food_entry, only: [:show, :update, :destroy]

    def index
      return admin_index if @current_user.admin?

      user_index
    end

    def create
      food_entry = FoodEntry.new(food_entry_params.merge(user_id: @current_user.id))
      if food_entry.save
        render json: food_entry, status: :created
      else
        render json: { errors: food_entry.errors }, status: :unprocessable_entity
      end
    end

    def show
      render json: @food_entry
    end

    def update
      authorize @food_entry
      if @food_entry.update(food_entry_params)
        render json: @food_entry
      else
        render json: @food_entry.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @food_entry
      if @food_entry.destroy
        render json: { message: 'Food Entry Deleted.' }
      else
        render json: { error: 'Food Entry not found' }, status: :not_found
      end
    end

    def single_user_food_entries
      authorize FoodEntry
      user = User.find(params[:id])
      render json: user.food_entries
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    end

    private

    def set_food_entry
      @food_entry = FoodEntry.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'FoodEntry not found' }, status: :not_found
    end

    def food_entry_params
      params.require(:food_entry).permit(:meal_id, :name, :calorie_value, :entry_time)
    end

    def admin_index
      all_food_entries = FoodEntry.includes(:user).all.order(id: :asc).page(params[:page]).per(params[:per_page])
      current_week_entries, previous_week_entries = FoodEntry.week_date_range
      user_entries_data = FoodEntry.calculate_user_entries_data(current_week_entries)

      render json: {
        food_entries: serialize_food_entries(all_food_entries),
        number_of_calories_per_user: user_entries_data,
        current_week_entries: current_week_entries.count,
        previous_week_entries: previous_week_entries.count
      }
    end

    def user_index
      food_entries = find_food_entries.order(id: :asc).page(params[:page]).per(params[:per_page])
      daily_calories_used, warning_dates = FoodEntry.grouped_entries_with_calories(food_entries, @current_user)

      render json: {
        food_entries: serialize_food_entries(food_entries),
        warning_dates: warning_dates,
        daily_calories: daily_calories_used
      }
    end

    def serialize_food_entries(entries)
      ActiveModelSerializers::SerializableResource.new(entries, each_serializer: FoodEntrySerializer)
    end

    def find_food_entries
      FoodEntry.for_user_and_date_range(@current_user.id, params[:start_date], params[:end_date])
    end
  end
end
