Types::KptLogType = GraphQL::ObjectType.define do
  name "KptLog"
  field :id, !types.ID
  field :keep, !types.String
  field :problem, !types.String
  field :try, !types.String
  field :created_at, !types.String
  field :updated_at, !types.String
end
