import React from 'react';
import PropTypes from 'prop-types';

const Pannel = ({ title, content, additionalStyle }) => (
  <div className={`pannel ${additionalStyle}`}>
    <div className="pannel--header">{title}</div>
    <div className="pannel--body">
      <div className="pannel--body--item">
        <div className="pannel--body--item--content">{content}</div>
      </div>
    </div>
  </div>
);

Pannel.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  additionalStyle: PropTypes.string.isRequired,
};

export default Pannel;
