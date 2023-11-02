class FoodEntry < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :name, presence: true
  validates :entry_time, presence: true
  validates :calorie_value, presence: true, numericality: { greater_than_or_equal_to: 0 }

  validate :validate_max_entries, on: :create

  scope :created_between, ->(start_date, end_date) { where('DATE(entry_time) IN (?)', start_date..end_date) }
  scope :for_user_and_date_range, lambda { |user_id, start_date, end_date|
    if start_date.present? && end_date.present?
      where(user_id: user_id).created_between(start_date, end_date)
    else
      where(user_id: user_id).where('DATE(entry_time) = ?', Time.now.utc.to_date)
    end
  }

  def validate_max_entries
    daily_meal_entries = FoodEntry.where('DATE(entry_time) = ?', Time.zone.today).where(user: user, meal: meal).count
    errors.add(:base, 'Maximum entries for this meal reached.') if daily_meal_entries >= meal.max_entries
  end

  def self.grouped_entries_with_calories(entries, current_user)
    grouped_entries = entries.group_by { |entry| entry.entry_time.to_date }
    daily_calories_used = {}
    warning_dates = {}

    grouped_entries.each_key do |key|
      day_total_calories = grouped_entries[key].pluck(:calorie_value).sum
      daily_calories_used[key] = day_total_calories
      warning_dates[key] = day_total_calories if day_total_calories > current_user.daily_calorie_limit
    end

    [daily_calories_used, warning_dates]
  end

  def self.week_date_range
    current_week_entries = created_between(1.week.ago.to_date + 1, Date.today)
    previous_week_entries = created_between(2.weeks.ago.to_date, 1.week.ago.to_date)
    [current_week_entries, previous_week_entries]
  end

  def self.calculate_user_entries_data(entries)
    user_entries_data = Hash.new(0)
    User.joins(:role).where(roles: { name: 'user' }).each do |user|
      user_entries_data[user.name] = entries.where(user_id: user.id).average(:calorie_value)
    end
    user_entries_data
  end
end
