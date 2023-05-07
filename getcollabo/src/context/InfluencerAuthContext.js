import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  influencer:
    localStorage.getItem("influencer") !== undefined
      ? JSON.parse(localStorage.getItem("influencer"))
      : null,
  loading: false,
  error: false,
};

export const InfluencerAuthContext = createContext(INITIAL_STATE);

const InfluencerAuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        influencer: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        influencer: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        influencer: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        influencer: null,
        loading: false,
        error: null,
      };
    case "SIGNUP_START":
      return {
        influencer: null,
        loading: true,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        influencer: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return {
        influencer: null,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        influencer: state.influencer,
        loading: true,
        error: null,
      };
    case "UPDATE_SUCCESS":
      return {
        influencer: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_FAILURE":
      return {
        influencer: true,
        loading: false,
        error: action.payload,
      };
    case "REGISTRATION_START":
      return {
        influencer: state.influencer,
        loading: true,
        error: null,
      };
    case "REGISTRATION_SUCCESS":
      return {
        influencer: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTRATION_FAILURE":
      return {
        influencer: true,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const InfluencerAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InfluencerAuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("influencer", JSON.stringify(state.influencer));
  }, [state.influencer]);

  return (
    <InfluencerAuthContext.Provider
      value={{
        influencer: state.influencer,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </InfluencerAuthContext.Provider>
  );
};
