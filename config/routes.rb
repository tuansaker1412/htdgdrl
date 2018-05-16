Rails.application.routes.draw do
  root "static_pages#home"
  devise_for :users, :skip => :sessions, :controllers => {:passwords => 'api/v1/users/passwords'}
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "sign_in", :to => 'sessions#create'
      namespace :users do
        resources :passwords
        resources :registrations
        resources :confirmations
        resources :unlock
        put "update_password", :to => "users#update"
      end
      namespace :students do
        resources :forms
      end
      namespace :admins do
        resources :class_names
      end
    end
  end
  namespace :admin do
    resources :users, only: [:index, :show, :edit, :update, :destroy]
  end
  get "*path", :to => "static_pages#home"
end
