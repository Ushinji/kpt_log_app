Types::UserType = GraphQL::ObjectType.define do
  name "User"
  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  connection :kpt_logs, !Types::KptLogType.connection_type
end
