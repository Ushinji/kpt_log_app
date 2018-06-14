import constants from '../constants';

const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};
