require 'rails_helper'

RSpec.describe FoodEntry, type: :model do
  let(:user) { User.create(name: 'User', email: 'user@example.com', password: 'password') }
  let(:meal) { Meal.create(name: 'Breakfast', meal_category: 'Morning', max_entries: 3) }

  context 'validations' do
    it 'is valid with valid attributes' do
      food_entry = FoodEntry.new(name: 'Eggs', entry_time: Time.now, calorie_value: 200, user: user, meal: meal)
      expect(food_entry).to be_valid
    end

    it 'is not valid without a name' do
      food_entry = FoodEntry.new(name: nil, entry_time: Time.now, calorie_value: 200, user: user, meal: meal)
      expect(food_entry).not_to be_valid
      expect(food_entry.errors[:name]).to include("can't be blank")
    end

    it 'is not valid without an entry_time' do
      food_entry = FoodEntry.new(name: 'Eggs', entry_time: nil, calorie_value: 200, user: user, meal: meal)
      expect(food_entry).not_to be_valid
      expect(food_entry.errors[:entry_time]).to include("can't be blank")
    end

    it 'is not valid without a calorie_value' do
      food_entry = FoodEntry.new(name: 'Eggs', entry_time: Time.now, calorie_value: nil, user: user, meal: meal)
      expect(food_entry).not_to be_valid
      expect(food_entry.errors[:calorie_value]).to include("can't be blank")
    end

    it 'is not valid with a negative calorie_value' do
      food_entry = FoodEntry.new(name: 'Eggs', entry_time: Time.now, calorie_value: -100, user: user, meal: meal)
      expect(food_entry).not_to be_valid
      expect(food_entry.errors[:calorie_value]).to include("must be greater than or equal to 0")
    end
  end

  context 'associations' do
    it 'belongs to a user' do
      food_entry = FoodEntry.reflect_on_association(:user)
      expect(food_entry.macro).to eq(:belongs_to)
    end

    it 'belongs to a meal' do
      food_entry = FoodEntry.reflect_on_association(:meal)
      expect(food_entry.macro).to eq(:belongs_to)
    end
  end
end
