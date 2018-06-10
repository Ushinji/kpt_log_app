const initialState = {
  projects: [
    {
      name: 'プロジェクト１',
    },
    {
      name: 'プロジェクト２',
    },
    {
      name: 'プロジェクト3',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_ACTION_TYPE':
      return state;
    default:
      return state;
  }
};
