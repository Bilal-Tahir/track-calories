require 'rails_helper'

RSpec.describe Api::FoodEntriesController, type: :controller do
  let(:admin_user) { create(:user, role: create(:role, name: 'admin')) }
  let(:regular_user) { create(:user, role: create(:role, name: 'user')) }
  let(:meal) { create(:meal) }

  describe 'GET #show' do
    it 'shows own food entry for user' do
      sign_in(regular_user)
      own_entry = create(:food_entry, user: regular_user)
      other_entry = create(:food_entry, user: admin_user)
      get :show, params: { id: own_entry.id }
      expect(response).to have_http_status(:ok)
      expect(assigns(:food_entry)).to eq(own_entry)
    end
  end

  describe 'POST #create' do
    context 'as admin' do
      before { sign_in(admin_user) }

      it 'creates a food entry' do
        meal = create(:meal)
        post :create, params: { food_entry: attributes_for(:food_entry, meal_id: meal.id) }
        expect(response).to have_http_status(:created)
      end
    end

    context 'as user' do
      before { sign_in(regular_user) }

      it 'creates a food entry' do
        meal = create(:meal)
        post :create, params: { food_entry: attributes_for(:food_entry, meal_id: meal.id) }
        expect(response).to have_http_status(:created)
      end

      it 'should not exceed max_entries limit for own meal' do
        meal = create(:meal, max_entries: 3)
        create_list(:food_entry, 3, user: regular_user, meal: meal)

        post :create, params: { food_entry: attributes_for(:food_entry, user_id: regular_user.id, meal_id: meal.id) }
        expect(response).to have_http_status(:unprocessable_entity)
        response_errors = JSON.parse(response.body)['errors']
        expect(response_errors['base']).to include('Maximum entries for this meal reached.')
      end
       
    end
  end

  describe 'PUT #update' do
    context 'as admin' do
      before { sign_in(admin_user) }

      it 'updates a food entry' do
        food_entry = create(:food_entry,user: admin_user, meal: meal)
        put :update, params: { id: food_entry.id, food_entry: { name: 'Updated Food' } }
        expect(response).to have_http_status(:ok)
        food_entry.reload
        expect(food_entry.name).to eq('Updated Food')
      end

      it 'update other user\'s entry' do
        other_user_entry = create(:food_entry, user: regular_user, meal: meal)
        put :update, params: { id: other_user_entry.id, food_entry: { name: 'Updated Food' } }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'as user' do
      before { sign_in(regular_user) }

      it 'updates own food entry' do
        food_entry = create(:food_entry, user: regular_user, meal: meal)
        put :update, params: { id: food_entry.id, food_entry: { name: 'Updated Food' } }
        expect(response).to have_http_status(:ok)
        food_entry.reload
        expect(food_entry.name).to eq('Updated Food')
      end

      it 'does not update other user\'s entry' do
        other_user_entry = create(:food_entry, user: admin_user, meal: meal)
        put :update, params: { id: other_user_entry.id, food_entry: { name: 'Updated Food' } }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'as admin' do
      before { sign_in(admin_user) }

      it 'deletes a food entry' do
        food_entry = create(:food_entry, user: admin_user, meal: meal)
        delete :destroy, params: { id: food_entry.id }
        expect(response).to have_http_status(:ok)
        expect(FoodEntry.exists?(food_entry.id)).to be_falsey
      end

      it 'does not delete other user\'s entry' do
        other_user_entry = create(:food_entry, user: regular_user)
        delete :destroy, params: { id: other_user_entry.id }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'as user' do
      before { sign_in(regular_user) }

      it 'deletes own food entry' do
        food_entry = create(:food_entry, user: regular_user)
        delete :destroy, params: { id: food_entry.id }
        expect(response).to have_http_status(:ok)
        expect(FoodEntry.exists?(food_entry.id)).to be_falsey
      end

      it 'does not delete other user\'s entry' do
        other_user_entry = create(:food_entry, user: admin_user)
        delete :destroy, params: { id: other_user_entry.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
