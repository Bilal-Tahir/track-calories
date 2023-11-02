# Create roles
Role.destroy_all
user_role = Role.create(id: 1, name: 'user')
admin_role = Role.create(id: 2, name: 'admin')

# Create users
User.destroy_all
user1 = User.create(name: 'Mike Sparza', email: 'mike.sparza@test.com', role: user_role, password: 'testuser')
user2 = User.create(name: 'Peter Smith', email: 'peter.smith@test.com', role: user_role, password: 'testuser')
User.create(name: 'Admin User', email: 'admin.user@test.com', role: admin_role, password: 'testuser')

# Create pre-defined meals
Meal.destroy_all
breakfast_meal = Meal.create(name: 'Breakfast Meal', meal_category: 'Breakfast', max_entries: 3)
lunch_meal = Meal.create(name: 'Lunch Meal', meal_category: 'Lunch', max_entries: 5)
dinner_meal = Meal.create(name: 'Dinner Meal', meal_category: 'Dinner', max_entries: 2)

# Create food entries
FoodEntry.destroy_all
food_entries_data = [
  { user: user1, meal: breakfast_meal, name: 'Oatmeal', calorie_value: 1.50, entry_time: Time.now },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 0.3, entry_time: Time.now },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 0.2, entry_time: Time.now.to_date - 7 },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 1.0, entry_time: Time.now.to_date - 7 },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 0.9, entry_time: Time.now.to_date - 1 },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 0.4, entry_time: Time.now.to_date - 1 },
  { user: user1, meal: lunch_meal, name: 'Chicken Salad', calorie_value: 0.2, entry_time: Time.now.to_date - 1 },
  { user: user1, meal: lunch_meal, name: 'Pizza', calorie_value: 0.8, entry_time: Time.now },
  { user: user1, meal: dinner_meal, name: 'Salmon', calorie_value: 2.3, entry_time: Time.now },
  { user: user2, meal: breakfast_meal, name: 'Yogurt', calorie_value: 2.3, entry_time: Time.now }
]

food_entries_data.each do |entry_data|
  FoodEntry.create(entry_data)
end
