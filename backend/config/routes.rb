Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post 'authenticate', to: 'authenticate#authenticate'
    post 'signup', to: 'authenticate#register'
    resources :food_entries
    resources :users, only: [:index] do
      member do
        get 'food_entries', to: 'food_entries#single_user_food_entries'
        post 'update_calorie_limit', to: 'users#update_daily_calorie_limit'
        post 'invite', to: 'users#invite_friend'
      end
      get 'current_logged_in_user', to: 'users#current_logged_in_user', on: :collection
    end
    resources :meals, only: [:index, :update, :show]
  end
end
