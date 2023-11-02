require 'rails_helper'

RSpec.describe Role, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      role = Role.new(name: 'admin')
      expect(role).to be_valid
    end

    it 'is not valid without a name' do
      role = Role.new(name: nil)
      expect(role).not_to be_valid
      expect(role.errors[:name]).to include("can't be blank")
    end

    it 'is not valid if name is too long' do
      role = Role.new(name: 'a' * 257)
      expect(role).not_to be_valid
      expect(role.errors[:name]).to include("is too long (maximum is 256 characters)")
    end
  end

  context 'associations' do
    it 'has many users' do
      role = Role.reflect_on_association(:users)
      expect(role.macro).to eq(:has_many)
    end
  end
end
