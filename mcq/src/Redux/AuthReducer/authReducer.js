import * as types from "./action.type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isError: false,
  isLoading: false,
  user: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null }
}

export const AuthReducer= (state = initialState, action)=> {
  const { type, payload } = action;

  switch (type) {
    case types.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: payload,
        isLoggedIn: false,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
      };

    case types.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: true,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: payload,
        isLoggedIn: true,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
      };

    case types.LOGOUT_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: true,
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        user: null,
      };

    case types.LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: true,
        isError: true,
        user: payload,
      }
    default:
      return state;
  }
}