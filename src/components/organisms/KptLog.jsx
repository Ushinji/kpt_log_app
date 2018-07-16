import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import KptLogDetail from './KptLogDetatil';
// import Pannel from '../molecules/Pannel';

moment.updateLocale('ja', {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

class KptLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKptLog: null,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { kptLogs } = nextProps;
    const { selectedKptLog } = this.state;

    const index = kptLogs.findIndex(k => k.id === selectedKptLog.id);
    this.setState({
      selectedKptLog: kptLogs[index],
    });
  }

  onClick(kptLog) {
    this.setState({
      selectedKptLog: kptLog,
    });
  }

  render() {
    const { kptLogs } = this.props;
    const { selectedKptLog } = this.state;

    return (
      <div className="kpt-log">
        <div className="kpt-log--list">
          <div className="kpt-log--list--title">作成履歴</div>
          {kptLogs.map((kptLog, index) => (
            <div
              key={`key-keptlog-${kptLog.id}`}
              className={`kpt-log--list--item ${
                index % 2 ? '' : 'kpt-log--list--item__odd'
              }`}
              onClick={() => {
                this.onClick(kptLog);
              }}
              role="presentation"
            >
              {moment(kptLog.created_at).format('YYYY/MM/DD(ddd)')}
            </div>
          ))}
        </div>
        <div className="kpt-log--detail">
          {selectedKptLog ? (
            <KptLogDetail kptLog={selectedKptLog} />
          ) : (
            <div className="kpt-log--detail--notice">
              作成履歴から、KPTを選択してください。
            </div>
          )}
        </div>
      </div>
    );
  }
}

KptLog.propTypes = {
  kptLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KptLog;
