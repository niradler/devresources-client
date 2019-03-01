import * as React from "react";
let AppContext = React.createContext();

let initialState = {
  resources:[],
  loading:false,
  page:1,
  tags:false,
  term:false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "resources":
      return { ...state, resources:action.payload };
      case "loading":
      return { ...state, loading:action.payload };
      case "page":
      return { ...state, page:action.payload };
      case "tags":
      return { ...state, tags:action.payload };
      case "term":
      return { ...state, term:action.payload };
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
