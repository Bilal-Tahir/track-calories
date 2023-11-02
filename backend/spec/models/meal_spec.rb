require 'rails_helper'

RSpec.describe Meal, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      meal = Meal.new(name: 'Breakfast', meal_category: 'Morning', max_entries: 2)
      expect(meal).to be_valid
    end

    it 'is not valid without a name' do
      meal = Meal.new(name: nil, meal_category: 'Morning', max_entries: 2)
      expect(meal).not_to be_valid
    end

    it 'is not valid without a meal_category' do
      meal = Meal.new(name: 'Breakfast', meal_category: nil, max_entries: 2)
      expect(meal).not_to be_valid
    end

    it 'is not valid without max_entries' do
      meal = Meal.new(name: 'Breakfast', meal_category: 'Morning', max_entries: nil)
      expect(meal).not_to be_valid
    end

    it 'is not valid with a name longer than 256 characters' do
      meal = Meal.new(name: 'a' * 257, meal_category: 'Morning', max_entries: 2)
      expect(meal).not_to be_valid
    end

    it 'is not valid with a meal_category longer than 256 characters' do
      meal = Meal.new(name: 'a' * 257, meal_category: 'a' * 257, max_entries: 2)
      expect(meal).not_to be_valid
    end

    it 'is not valid with a negative max_entries value' do
      meal = Meal.new(name: 'Breakfast', meal_category: 'Morning', max_entries: -1)
      expect(meal).not_to be_valid
    end
  end

  describe 'associations' do
    it 'has many food_entries' do
      assc = Meal.reflect_on_association(:food_entries)
      expect(assc.macro).to eq :has_many
    end
  end
end
