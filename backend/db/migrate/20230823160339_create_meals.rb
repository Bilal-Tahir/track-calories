class CreateMeals < ActiveRecord::Migration[6.0]
  def change
    create_table :meals do |t|
      t.string :name, null: false
      t.string :meal_category, null: false
      t.integer :max_entries, null: false

      t.timestamps
    end

    # Added a constraint to prevent negative values in max_entries
    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE meals
          ADD CONSTRAINT max_entries_non_negative CHECK (max_entries >= 0)
        SQL
      end
      dir.down do
        execute <<-SQL
          ALTER TABLE meals
          DROP CONSTRAINT max_entries_non_negative
        SQL
      end
    end
  end
end
