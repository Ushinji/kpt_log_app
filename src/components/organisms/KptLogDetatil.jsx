import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
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
            <div
              className="kpt-log--detail--header--actions--item"
              onClick={this.openModal}
              role="presentation"
            >
              <i className="material-icons">delete</i>
            </div>
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
