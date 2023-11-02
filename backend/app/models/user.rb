class User < ApplicationRecord
  DEFAULT_CALORIE_LIMIT = 2.100

  has_secure_password

  has_many :food_entries
  belongs_to :role

  validates :name, presence: true, length: { maximum: 256 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :daily_calorie_limit, presence: true, numericality: { greater_than_or_equal_to: 0.0 }
  validates :password_digest, presence: true
  validates :role, presence: true

  before_validation :set_user_default_values

  after_commit :send_invite_email, on: :create

  def admin?
    role.name == 'admin'
  end

  private

  def send_invite_email
    UserMailer.invite_friend(self).deliver
  end

  def set_user_default_values
    self.role_id ||= 1
    self.daily_calorie_limit ||= DEFAULT_CALORIE_LIMIT
  end
end
