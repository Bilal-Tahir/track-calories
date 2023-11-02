class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, length: { maximum: 256 }
end
