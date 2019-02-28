import * as React from "react";
let AppContext = React.createContext();

let initialState = {
  resources:[]
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "resources":
      return { ...state, resources:action.payload };
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
