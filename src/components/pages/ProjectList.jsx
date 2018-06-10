import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProjectList = props => {
  console.log(props);
  console.log(props.projects);
  return <div>ほげえええ</div>;
};

ProjectList.propTypes = {
  projects: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(ProjectList);
