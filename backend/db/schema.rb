# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_08_24_095419) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "food_entries", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "entry_time", null: false
    t.string "name", null: false
    t.float "calorie_value", null: false
    t.bigint "meal_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["meal_id"], name: "index_food_entries_on_meal_id"
    t.index ["user_id"], name: "index_food_entries_on_user_id"
  end

  create_table "meals", force: :cascade do |t|
    t.string "name", null: false
    t.string "meal_category", null: false
    t.integer "max_entries", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.float "daily_calorie_limit", default: 2.1, null: false
    t.bigint "role_id", default: 1, null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "food_entries", "meals"
  add_foreign_key "food_entries", "users"
  add_foreign_key "users", "roles"
end
