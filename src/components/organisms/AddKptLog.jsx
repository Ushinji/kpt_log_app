import React from 'react';
import { Mutation } from 'react-apollo';
import Queries from '../../queries';

class AddKptLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepForm: '',
      problemForm: '',
      tryForm: '',
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
    const { keepForm, problemForm, tryForm } = this.state;
    createKptLog({
      variables: {
        keep: keepForm,
        problem: problemForm,
        try: tryForm,
      },
    });
    this.setState({
      keepForm: '',
      problemForm: '',
      tryForm: '',
    });
  }

  render() {
    const { keepForm, problemForm, tryForm } = this.state;

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
                name="keepForm"
                value={keepForm}
                onChange={this.handleChange}
              />

              <textarea
                id="kpt-problem"
                name="problemForm"
                value={problemForm}
                onChange={this.handleChange}
              />

              <textarea
                id="kpt-try"
                name="tryForm"
                value={tryForm}
                onChange={this.handleChange}
              />
              <button type="submit">Create KPT LOG </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddKptLog;
