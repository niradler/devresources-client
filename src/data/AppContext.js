import * as React from "react";
let AppContext = React.createContext();

let initialState = {
  resources: [],
  loading: false,
  page: 1,
  tags: false,
  term: false,
  authModal: false,
  addModal: false,
  isAuth: false,
  favorites: {}
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "resources":
      return { ...state, resources: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "page":
      return { ...state, page: action.payload };
    case "tags":
      return { ...state, tags: action.payload };
    case "term":
      return { ...state, term: action.payload };
    case "user":
      return { ...state, user: action.payload };
    case "authModal":
      return { ...state, authModal: action.payload };
    case "addModal":
      return { ...state, addModal: action.payload };
    case "isAuth":
      return { ...state, isAuth: action.payload };
    case "favorites":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

function AppContextProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
