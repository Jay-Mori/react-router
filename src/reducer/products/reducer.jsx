// products/reducer.js

const initialState = {
  isloading: false,
  iserror: false,
  data: []
};

export function Reducers(state = initialState, { type, payload }) {
  switch (type) {
    case "request":
      return { ...state, isloading: true, iserror: false };

    case "success":
      return { ...state, data: payload, isloading: false, iserror: false };

    case "rejected":
      return { ...state, iserror: true, isloading: false };

    default:
      return state;
  }
}
