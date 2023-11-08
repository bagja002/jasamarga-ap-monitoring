// actions.js
export const toggleSwitch = (isChecked) => {
  return {
    type: 'TOGGLE_SWITCH',
    payload: isChecked,
  };
};
