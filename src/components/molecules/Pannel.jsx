import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const Pannel = ({ kptLog }) => (
  <div className="pannel">
    <div className="pannel__header">
      {moment(kptLog.created_at).format('YYYY/MM/DD HH:MM')}
    </div>
    <div className="pannel__body">
      <div className="pannel__body__item">
        <div className="pannel__body__item__title">Keep </div>
        <div className="pannel__body__item__content">{kptLog.keep} </div>
      </div>
      <div className="pannel__body__item">
        <div className="pannel__body__item__title">Problem </div>
        <div className="pannel__body__item__content">{kptLog.problem} </div>
      </div>
      <div className="pannel__body__item">
        <div className="pannel__body__item__title">Try </div>
        <div className="pannel__body__item__content">{kptLog.try} </div>
      </div>
    </div>
  </div>
);

Pannel.propTypes = {
  kptLog: PropTypes.instanceOf(Object).isRequired,
};

export default Pannel;
