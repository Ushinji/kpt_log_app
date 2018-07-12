Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :updateKptLogMutation, Mutations::UpdateKptLogMutation.field
  field :createKptLogMutation, Mutations::CreateKptLogMutation.field
end
