import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Mutation } from 'react-apollo';
import Queries from '../../queries';

Modal.setAppElement('#root');

class AddKptLogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepForm: '',
      problemForm: '',
      tryForm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e, createKptLog) {
    const { closeModal } = this.props;

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
    closeModal();
  }

  handleClose() {
    const { closeModal } = this.props;
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        'モーダルを閉じると作成中の内容が記録されません。よろしいですか？'
      )
    ) {
      closeModal();
    }
  }

  render() {
    const { keepForm, problemForm, tryForm } = this.state;
    const { isOpen, contentLabel } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.handleClose}
        contentLabel={contentLabel}
      >
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
                <button type="submit">新規作成</button>
                <button type="button" onClick={this.handleClose}>
                  閉じる
                </button>
              </form>
            </div>
          )}
        </Mutation>
      </Modal>
    );
  }
}

AddKptLogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
};

export default AddKptLogModal;
