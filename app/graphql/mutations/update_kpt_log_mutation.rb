Mutations::UpdateKptLogMutation = GraphQL::Relay::Mutation.define do
  name "UpdateKptLogMutation"

  input_field :id, !types.ID
  input_field :keep, !types.String
  input_field :problem, !types.String
  input_field :try, !types.String

  return_field :kpt_log, !Types::KptLogType

  resolve ->(obj, args, ctx) {
    begin
      kpt_log = ctx[:current_user].kpt_logs.find(args.id)
      kpt_log.keep = args.keep
      kpt_log.problem = args.problem
      kpt_log.try = args.try
      kpt_log.save
    rescue => exception
      return GraphQL::ExecutionError.new(exception.message)
    end

    { kpt_log: kpt_log }
  }
end
