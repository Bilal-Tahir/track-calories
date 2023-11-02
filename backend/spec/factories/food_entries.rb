FactoryBot.define do
  factory :food_entry do
    user
    meal
    name { Faker::Food.dish }
    calorie_value { 300 }
    entry_time { Time.current }
  end
end
