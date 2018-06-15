Rails.application.routes.draw do
  namespace :api do
    if Rails.env.development?
      mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
    end
    post "/graphql", to: "graphql#execute"
  end

  match '*any', to: 'root#index', via: :all
  root to: 'root#index'
end
