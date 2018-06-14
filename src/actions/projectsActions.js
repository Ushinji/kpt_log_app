import constants from '../constants';

function getProjects() {
  const projects = [
    {
      id: 1,
      display_name: 'テストプロジェクト１',
    },
    {
      id: 2,
      display_name: 'テストプロジェクト２',
    },
  ];

  return {
    type: constants.SET_PROJECTS,
    projects,
  };
}

export default {
  getProjects,
};
