Rails.application.routes.draw do
  match 'hoge', to: 'root#index', via: :all
end
