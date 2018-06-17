import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_KPT_LOG = gql`
  mutation createKptLog($keep: String!, $problem: String!, $try: String!) {
    createKptLogMutation(input: { keep: $keep, problem: $problem, try: $try }) {
      kpt_log {
        id
        keep
        problem
        try
      }
    }
  }
`;

const GET_KPT_LOG_LIST = gql`
  {
    user {
      kpt_logs {
        edges {
          node {
            id
            keep
            problem
            try
          }
        }
      }
    }
  }
`;

class AddKptLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keep: '',
      problem: '',
      try: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e, createKptLog) {
    e.preventDefault();
    createKptLog({
      variables: {
        keep: this.state.keep,
        problem: this.state.problem,
        try: this.state.try,
      },
    });
    this.setState({
      keep: '',
      problem: '',
      try: '',
    });
  }

  render() {
    const { keep, problem } = this.state;

    return (
      <Mutation
        mutation={CREATE_KPT_LOG}
        update={(cache, { data }) => {
          console.log(data);
          const cacheData = cache.readQuery({ query: GET_KPT_LOG_LIST });
          // MEMO: とりあえず、先頭データをコピー・追加をして、キャッシュ変更が画面表示に反映されるかテスト
          cacheData.user.kpt_logs.edges.push(cacheData.user.kpt_logs.edges[0]);
          cache.writeQuery({
            query: GET_KPT_LOG_LIST,
            data: cacheData,
          });
        }}
      >
        {createKptLog => (
          <div>
            <form
              onSubmit={e => {
                this.handleSubmit(e, createKptLog);
              }}
            >
              <textarea
                id="kpt-keep"
                name="keep"
                value={keep}
                onChange={this.handleChange}
              />

              <textarea
                id="kpt-problem"
                name="problem"
                value={problem}
                onChange={this.handleChange}
              />

              <textarea
                id="kpt-try"
                name="try"
                value={this.state.try}
                onChange={this.handleChange}
              />
              <button type="submit">Create KPT LOG</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddKptLog;
