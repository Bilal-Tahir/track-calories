FactoryBot.define do
  factory :meal do
    name { 'Lunch Meal' }
    meal_category { 'Lunch' }
    max_entries { 3 }
  end
end
