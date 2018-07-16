import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Mutation } from 'react-apollo';
import Queries from '../../queries';

Modal.setAppElement('#root');

class EditKptLogModal extends React.Component {
  constructor(props) {
    super(props);

    const { kptLog } = this.props;
    this.state = {
      kptLotId: kptLog.id,
      keepForm: kptLog.keep,
      problemForm: kptLog.problem,
      tryForm: kptLog.try,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { kptLog } = nextProps;
    this.setState({
      kptLotId: kptLog.id,
      keepForm: kptLog.keep,
      problemForm: kptLog.problem,
      tryForm: kptLog.try,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e, updateKptLog) {
    e.preventDefault();

    const { closeModal } = this.props;
    const { kptLotId, keepForm, problemForm, tryForm } = this.state;

    if (
      // eslint-disable-next-line no-alert
      window.confirm('この内容で作成しますか？')
    ) {
      updateKptLog({
        variables: {
          id: kptLotId,
          keep: keepForm,
          problem: problemForm,
          try: tryForm,
        },
      });
      closeModal();
    }
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
        contentLabel={contentLabel}
        className="modal--container"
        overlayClassName="modal--overlay"
      >
        <Mutation mutation={Queries.UPDATE_KPT_LOG}>
          {updateKptLog => (
            <div>
              <div className="modal--container--title">KPTの編集</div>
              <form
                onSubmit={e => {
                  this.handleSubmit(e, updateKptLog);
                }}
              >
                <div className="modal--container--body">
                  <label htmlFor="kpt-keep">
                    Keep
                    <textarea
                      id="kpt-keep"
                      name="keepForm"
                      value={keepForm}
                      onChange={this.handleChange}
                      className="modal--body__item__form"
                    />
                  </label>
                </div>

                <div className="modal--container--body">
                  <label htmlFor="kpt-problem">
                    Problem
                    <textarea
                      id="kpt-problem"
                      name="problemForm"
                      value={problemForm}
                      onChange={this.handleChange}
                      className="modal--body__item__form"
                    />
                  </label>
                </div>

                <div className="modal--container--body">
                  <label htmlFor="kpt-try">
                    Try
                    <textarea
                      id="kpt-try"
                      name="tryForm"
                      value={tryForm}
                      onChange={this.handleChange}
                      className="modal--body__item__form"
                    />
                  </label>
                </div>

                <div className="modal--container--actions">
                  <div className="modal--container--actions--item">
                    <button type="submit" className="button button__primary">
                      修正
                    </button>
                  </div>
                  <div className="modal--container--actions--item">
                    <button
                      type="button"
                      onClick={this.handleClose}
                      className="button"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Mutation>
      </Modal>
    );
  }
}

EditKptLogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  kptLog: PropTypes.instanceOf(Object).isRequired,
};

export default EditKptLogModal;
