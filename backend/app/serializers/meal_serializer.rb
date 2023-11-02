class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :meal_category, :max_entries
end
