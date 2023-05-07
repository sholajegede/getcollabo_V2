import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  brand:
    localStorage.getItem("brand") !== undefined
      ? JSON.parse(localStorage.getItem("brand"))
      : null,
  loading: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        brand: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        brand: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        brand: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        brand: null,
        loading: false,
        error: null,
      };
    case "SIGNUP_START":
      return {
        brand: null,
        loading: true,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        brand: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return {
        brand: null,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        brand: state.brand,
        loading: true,
        error: null,
      };
    case "UPDATE_SUCCESS":
      return {
        brand: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_FAILURE":
      return {
        brand: true,
        loading: false,
        error: action.payload,
      };
    case "REGISTRATION_START":
      return {
        brand: state.brand,
        loading: true,
        error: null,
      };
    case "REGISTRATION_SUCCESS":
      return {
        brand: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTRATION_FAILURE":
      return {
        brand: true,
        loading: false,
        error: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        brand: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("brand", JSON.stringify(state.brand));
  }, [state.brand]);

  return (
    <AuthContext.Provider
      value={{
        brand: state.brand,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
