class InvitationMailer < ApplicationMailer
  def invite_friend(user)
    @user = user
    mail from: 'calorie@tracker.com', to: @user.email, subject: 'Invitation To Calorie Tracker'
  end
end
