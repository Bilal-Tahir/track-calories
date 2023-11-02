module AuthenticationHelper
  def sign_in(user)
    token = JsonWebToken.encode(user_id: user.id)
    request.headers['Authorization'] = "Bearer #{token}"
  end
end
