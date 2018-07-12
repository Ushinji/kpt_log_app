import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

moment.updateLocale('ja', {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

const KptLogDetatil = ({ kptLog }) => (
  <div>
    <div className="kpt-log--detail--header">
      {moment(kptLog.created_at).format('YYYY/MM/DD(ddd)')}
    </div>
    <div className="kpt-log--detail--body">KPT - 内容</div>
  </div>
);

KptLogDetatil.propTypes = {
  kptLog: PropTypes.instanceOf(Object).isRequired,
};

export default KptLogDetatil;
