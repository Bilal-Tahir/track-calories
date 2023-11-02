require 'rails_helper'

RSpec.describe Api::MealsController, type: :controller do
  let(:admin_user) { create(:user, role: create(:role, name: 'admin')) }
  let(:regular_user) { create(:user, role: create(:role, name: 'user')) }

  describe 'GET #show' do
    before { sign_in(admin_user) }
    it 'shows a meal' do
      meal = create(:meal)
      get :show, params: { id: meal.id }
      expect(response).to have_http_status(:ok)

      meal_response = JSON.parse(response.body)
      expect(meal_response['id']).to eq(meal.id)
    end
  end

  describe 'PUT #update' do
    context 'as admin' do
      before { sign_in(admin_user) }

      it 'updates a meal' do
        meal = create(:meal)
        put :update, params: { id: meal.id, meal: { name: 'Updated Meal' } }
        expect(response).to have_http_status(:ok)
        meal.reload
        expect(meal.name).to eq('Updated Meal')
      end
    end
  end
end
