class FoodEntrySerializer < ActiveModel::Serializer
  attributes :id, :name, :calorie_value, :entry_time

  belongs_to :meal
end
