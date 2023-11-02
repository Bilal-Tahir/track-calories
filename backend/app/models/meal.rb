class Meal < ApplicationRecord
  has_many :food_entries

  validates :name, presence: true, length: { maximum: 256 }
  validates :meal_category, presence: true, length: { maximum: 256 }
  validates :max_entries, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
