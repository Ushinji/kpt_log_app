import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Mutation } from 'react-apollo';
import Queries from '../../queries';
import Pannel from '../molecules/Pannel';
import EditKptLogModal from './EditKptLogModal';

moment.updateLocale('ja', {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

class KptLogDetatil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  handleDelete(deleteKptLog) {
    const { kptLog } = this.props;
    if (
      // eslint-disable-next-line no-alert
      window.confirm('本当に削除してもよろしいですか？')
    ) {
      deleteKptLog({
        variables: {
          id: kptLog.id,
        },
      });
    }
  }

  render() {
    const { modalIsOpen } = this.state;
    const { kptLog } = this.props;

    return (
      <div>
        <div className="kpt-log--detail--header">
          <div className="kpt-log--detail--header--date">
            {moment(kptLog.created_at).format('YYYY/MM/DD(ddd)')}
          </div>
          <div className="kpt-log--detail--header--actions">
            <div
              className="kpt-log--detail--header--actions--item"
              onClick={this.openModal}
              role="presentation"
            >
              <i className="material-icons">border_color</i>
            </div>
            <Mutation
              mutation={Queries.DELETE_KPT_LOG}
              update={cache => {
                const cacheData = cache.readQuery({
                  query: Queries.GET_KPT_LOGS,
                });
                const index = cacheData.kpt_logs.findIndex(
                  k => k.id === kptLog.id
                );
                cacheData.kpt_logs.splice(index, 1);
                cache.writeQuery({
                  query: Queries.GET_KPT_LOGS,
                  data: cacheData,
                });
              }}
            >
              {deleteKptLog => (
                <div
                  className="kpt-log--detail--header--actions--item"
                  onClick={() => {
                    this.handleDelete(deleteKptLog);
                  }}
                  role="presentation"
                >
                  <i className="material-icons">delete</i>
                </div>
              )}
            </Mutation>
          </div>
        </div>

        <EditKptLogModal
          isOpen={modalIsOpen}
          closeModal={this.closeModal}
          contentLabel="AddKPTLogModal"
          kptLog={kptLog}
        />

        <div className="kpt-log--detail--body">
          <Pannel
            title="Keep"
            content={kptLog.keep}
            additionalStyle="pannel__keep"
          />
        </div>
        <div className="kpt-log--detail--body">
          <Pannel
            title="Problem"
            content={kptLog.problem}
            additionalStyle="pannel__problem"
          />
        </div>
        <div className="kpt-log--detail--body">
          <Pannel
            title="Try"
            content={kptLog.try}
            additionalStyle="pannel__try"
          />
        </div>
      </div>
    );
  }
}

KptLogDetatil.propTypes = {
  kptLog: PropTypes.instanceOf(Object).isRequired,
};

export default KptLogDetatil;
