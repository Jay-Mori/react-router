// auth/reducer.js

const initialState = {
  user: [], // list of all users signed up
  isAuthenticated: false,
  currentUser: {}
};

export function Reducers(state = initialState, { type, payload }) {
  switch (type) {
    case "signup":
      return {
        ...state,
        user: [...state.user, payload],
        isAuthenticated: true,
        currentUser: payload
      };

    case "signin":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload
      };

    case "signout":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {}
      };

    default:
      return state;
  }
}
