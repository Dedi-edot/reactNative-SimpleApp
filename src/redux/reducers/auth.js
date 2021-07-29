/* eslint-disable prettier/prettier */
const init_state = {
  username: '',
};

export default (state = init_state, action) => {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      return {...state, username: action.payload};
    case 'LOGIN_BTN_HANDLER':
      return {...state, username: action.payload};
    case 'RESET_USERNAME':
      return {...state, username: ''};
    default:
      return state;
  }
};
