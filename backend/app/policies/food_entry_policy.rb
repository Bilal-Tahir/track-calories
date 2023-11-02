class FoodEntryPolicy < ApplicationPolicy
  def update?
    user.admin? || record.user == user
  end

  def destroy?
    user.admin? || record.user == user
  end

  def single_user_food_entries?
    user.admin?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
