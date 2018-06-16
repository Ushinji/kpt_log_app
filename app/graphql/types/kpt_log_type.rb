Types::KptLogType = GraphQL::ObjectType.define do
  name "KptLog"
  field :id, !types.ID
  field :keep, !types.String
  field :problem, !types.String
  field :try, !types.String
end
