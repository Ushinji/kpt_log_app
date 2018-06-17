import React from 'react';
import { Mutation } from 'react-apollo';
import Queries from '../../queries';

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
        mutation={Queries.CREATE_KPT_LOG}
        update={(cache, { data }) => {
          const newKPTLog = data.createKptLogMutation.kpt_log;
          const cacheData = cache.readQuery({ query: Queries.GET_KPT_LOGS });
          cacheData.kpt_logs.push(newKPTLog);
          cache.writeQuery({
            query: Queries.GET_KPT_LOGS,
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
