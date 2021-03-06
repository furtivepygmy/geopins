const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'SET_ISAUTH':
      return {
        ...state,
        isAuth: payload
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: null
      };
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        },
        currentPin: null
      };
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      };
    case 'GET_PINS':
      return {
        ...state,
        pins: payload
      };
    case 'CREATE_PIN':
      const newPin = payload;
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin]
      };
    case 'SET_PIN':
      return {
        ...state,
        currentPin: payload,
        draft: null
      };
    case 'DELETE_PIN':
      const deletedPin = payload;
      const filteredPins = state.pins.filter(pin => pin._id !== deletedPin._id);

      if (state.currentPin) {
        const isCurrentPin = deletedPin._id === state.currentPin._id;
        if (isCurrentPin) {
          return {
            ...state,
            currentPin: null,
            pins: filteredPins
          };
        }
      }
      return {
        ...state,
        pins: filteredPins
      };
    case 'CREATE_COMMENT':
      const updatedCurrentPin = payload;
      // find and replace
      const updatedPins = state.pins.map(pin =>
        pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin
      );
      return {
        ...state,
        currentPin: updatedCurrentPin,
        pins: updatedPins
      };
    default:
      return state;
  }
};

export default reducer;
