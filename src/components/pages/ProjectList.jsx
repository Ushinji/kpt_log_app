import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import projectsActions from '../../actions/projectsActions';

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.actions.getProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <div>
        <ul>
          {projects.map(p => <li key={`key${p.id}`}>{p.display_name}</li>)}
        </ul>
      </div>
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({ projects: state.projects });

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(projectsActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
