FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "User#{n}" }
    email { Faker::Internet.email }
    password { 'password' }

    factory :admin_user do
      association :role, factory: :admin_role
    end

    factory :regular_user do
      association :role, factory: :user_role
    end
  end
end
