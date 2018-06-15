Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  
  field :testField, types.String do
    description "An example field added by the generator"
    resolve ->(obj, args, ctx) {
      "Hello World!"
    }
  end

  field :user, !Types::UserType do
    resolve ->(_obj, _args, ctx) {
      ctx[:current_user]
    }
  end
end
