class UserPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def update_daily_calorie_limit?
    !user.admin? && record == user
  end

  class Scope < Scope
    def resolve
      case user.role.name
      when 'admin'
        scope.all
      when 'user'
        scope.where(id: user.id)
      else
        scope.none
      end
    end
  end
end
