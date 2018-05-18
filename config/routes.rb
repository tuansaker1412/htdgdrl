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
        resources :forms, only: [:index]
        resources :students
        get "/get_all_class_names", :to => "class_names#get_all"
        resources :teachers
      end
      namespace :teachers do
        resources :forms, only: [:index]
      end
      namespace :super_students do
        resources :forms, only: [:index]
      end
      post "/send_form", :to => "forms#send_form"
      post "/back_form", :to => "forms#back_form"
    end
  end
  namespace :admin do
    resources :users, only: [:index, :show, :edit, :update, :destroy]
  end
  get "*path", :to => "static_pages#home"
end
