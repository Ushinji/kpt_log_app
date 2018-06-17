import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_KPT_LOG = gql`
  mutation createKptLog($keep: String!, $problem: String!, $try: String!) {
    createKptLogMutation(input: { keep: $keep, problem: $problem, try: $try }) {
      kpt_log {
        id
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
      <Mutation mutation={CREATE_KPT_LOG}>
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
