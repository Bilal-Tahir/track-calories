class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :daily_calorie_limit
end
