Mutations::DeleteKptLogMutation = GraphQL::Relay::Mutation.define do
  name "DeleteKptLogMutation"
  input_field :id, !types.ID
  
  return_field :deleted_id, !types.ID

  resolve ->(obj, args, ctx) {
    begin
      kpt_log = ctx[:current_user].kpt_logs.find(args.id)
      kpt_log.destroy
    rescue => exception
      return GraphQL::ExecutionError.new(exception.message)
    end
    return { deleted_id: args.id }
  }
end
