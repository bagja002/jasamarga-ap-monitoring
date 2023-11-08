// reducers.js
const initialState = {
  switchValue: false,
  jwt:null
  // ...
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return {
        ...state,
        switchValue: action.payload,
      };
    case 'set_JWT':
      return{
        ...state,
        jwt:action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;
