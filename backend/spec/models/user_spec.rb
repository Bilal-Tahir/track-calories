require 'rails_helper'

RSpec.describe User, type: :model do
  let(:role) { Role.create(name: 'user') }

  it 'is valid with valid attributes' do
    user = User.new(name: 'John Doe', email: 'john@example.com', daily_calorie_limit: 2.1, role_id: role.id, password: 'password')
    expect(user).to be_valid
  end

  it 'is valid with default daily calorie limit' do
    user = User.new(name: 'John Doe', email: 'john@example.com', role: role, password: 'password')
    expect(user).to be_valid
  end

  it 'is valid with minimum allowed daily calorie limit' do
    user = User.new(name: 'John Doe', email: 'john@example.com', daily_calorie_limit: 0, role: role, password: 'password')
    expect(user).to be_valid
  end

  it 'returns true for admin user' do
    admin_role = Role.create(name: 'admin')
    user = User.new(name: 'Admin User', email: 'admin@example.com', role: admin_role, password: 'password')
    expect(user.admin?).to be_truthy
  end

  it 'is invalid without a name' do
    user = User.new(name: nil, email: 'john@example.com', daily_calorie_limit: 2.1, role_id: role.id, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid without a valid email' do
    user = User.new(name: 'John Doe', email: 'invalid_email', daily_calorie_limit: 2.1, role_id: role.id, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid without an email' do
    user = User.new(name: 'John Doe', email: nil, daily_calorie_limit: 2.1, role_id: role.id, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid without a role' do
    user = User.new(name: 'John Doe', email: 'john@example.com', daily_calorie_limit: 2.1, role_id: nil, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid with a non-existent role' do
    user = User.new(name: 'John Doe', email: 'john@example.com', role_id: 999, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid with a negative daily calorie limit' do
    user = User.new(name: 'John Doe', email: 'invalid_email', daily_calorie_limit: -100, role_id: role.id, password: 'password')
    expect(user).not_to be_valid
  end

  it 'is invalid with a non-numeric daily calorie limit' do
    user = User.new(name: 'John Doe', email: 'john@example.com', daily_calorie_limit: 'invalid', role: role, password: 'password')
    expect(user).not_to be_valid
  end
end
