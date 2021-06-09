import React, { useReducer, createContext } from 'react';
import { AccountBox } from "./components/accountBox";
import HomePage from "./components/homePage/homePage"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";




export const AuthContext = createContext();
const initiaState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state, isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload.user
      }

    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initiaState);

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          {!state.isAuthenticated ?
            <Redirect to={{
              pathname: "/"
            }}
            /> :
            <Redirect to={{
              pathname: "homepage"
            }}
            />
          }
          <Route exact path="/" component={AccountBox} />
          <Route exact path="/homepage" component={HomePage} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
