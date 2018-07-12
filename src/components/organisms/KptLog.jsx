import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
// import Pannel from '../molecules/Pannel';

moment.lang('ja', {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

const KptLog = ({ kptLogs }) => (
  <div className="kpt-log">
    <div className="kpt-log--list">
      <div className="kpt-log--list--title">作成履歴</div>
      {kptLogs.map((kptLog, index) => (
        <div
          key={`key-keptlog-${kptLog.id}`}
          className={`kpt-log--list--item ${
            index % 2 ? '' : 'kpt-log--list--item__odd'
          }`}
        >
          {moment(kptLog.created_at).format('YYYY/MM/DD(ddd)')}
        </div>
      ))}
    </div>
    <div className="kpt-log--detail">
      <div className="kpt-log--detail--header">KPT - タイトル</div>
      <div className="kpt-log--detail--body">KPT - 内容</div>
    </div>
  </div>
);

KptLog.propTypes = {
  kptLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KptLog;
