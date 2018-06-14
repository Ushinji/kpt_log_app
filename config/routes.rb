Rails.application.routes.draw do
  match '*any', to: 'root#index', via: :all
  root to: 'root#index'
end
