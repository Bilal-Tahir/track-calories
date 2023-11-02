class CreateFoodEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :food_entries do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :entry_time, null: false
      t.string :name, null: false
      t.float :calorie_value, null: false, precision: 5, scale: 2
      t.references :meal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
