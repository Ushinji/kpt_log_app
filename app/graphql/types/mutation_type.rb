Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createKptLogMutation, Mutations::CreateKptLogMutation.field
end
