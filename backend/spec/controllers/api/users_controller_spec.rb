require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let(:admin_user) { create(:user, role: create(:role, name: 'admin')) }
  let(:regular_user) { create(:user, role: create(:role, name: 'user')) }

  describe 'GET all users' do
    context 'as admin' do
      before { sign_in(admin_user) }

      it 'lists all users with "user" role' do
        create_list(:user, 3, role: create(:role, name: 'user'))
        get :index
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PATCH #update_daily_calorie_limit' do
    context 'as user' do
      before { sign_in(regular_user) }

      it 'updates daily calorie limit' do
        patch :update_daily_calorie_limit, params: { id: regular_user.id, user: { daily_calorie_limit: 2000 } }
        expect(response).to have_http_status(:ok)
        regular_user.reload
        expect(regular_user.daily_calorie_limit).to eq(2000)
      end
    end
  end
end
