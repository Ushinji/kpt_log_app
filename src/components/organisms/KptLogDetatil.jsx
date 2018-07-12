import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Pannel from '../molecules/Pannel';

moment.updateLocale('ja', {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

const KptLogDetatil = ({ kptLog }) => (
  <div>
    <div className="kpt-log--detail--header">
      {moment(kptLog.created_at).format('YYYY/MM/DD(ddd)')}
    </div>
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
      <Pannel title="Try" content={kptLog.try} additionalStyle="pannel__try" />
    </div>
  </div>
);

KptLogDetatil.propTypes = {
  kptLog: PropTypes.instanceOf(Object).isRequired,
};

export default KptLogDetatil;
