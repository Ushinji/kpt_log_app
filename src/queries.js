import gql from 'graphql-tag';

export default {
  GET_KPT_LOGS: gql`
    {
      kpt_logs {
        id
        keep
        problem
        try
        created_at
      }
    }
  `,
  CREATE_KPT_LOG: gql`
    mutation createKptLog($keep: String!, $problem: String!, $try: String!) {
      createKptLogMutation(
        input: { keep: $keep, problem: $problem, try: $try }
      ) {
        kpt_log {
          id
          keep
          problem
          try
          created_at
        }
      }
    }
  `,
};
