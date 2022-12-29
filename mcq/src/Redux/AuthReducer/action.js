import * as types from "./action.type";
import AuthService from "../../services/auth.service";


// Registration actions
export const registerStart=()=>({
  type:types.REGISTER_START,
});

export const registerSuccess=(user)=>({
  type:types.REGISTER_SUCCESS,
  payload:user
});


export const registerFail=(error)=>({
  type:types.REGISTER_FAIL,
  payload:error
});



// Login Actions
export const loginStart=()=>({
  type:types.LOGIN_START,
});

export const loginSuccess=(user)=>({
  type:types.LOGIN_SUCCESS,
  payload:user
});

export const loginFail=(error)=>({
  type:types.LOGIN_FAIL,
  payload:error
});


// LogOut Actions
export const logOutStart=()=>({
  type:types.LOGOUT_START,
});

export const logOutSuccess=(user)=>({
  type:types.LOGOUT_SUCCESS,
  payload:user
});

export const logOutFail=(error)=>({
  type:types.LOGOUT_FAIL,
  payload:error
});


// Set Current User
export const setCurrentuser=(user)=>({
  type:types.SET_CURRENT_USER,
  payload:user
});



// Registration 

export const register = (name, email, password,confirmPassword,dob) => (dispatch) => {
  dispatch({type:types.LOGIN_START});
  return AuthService.register(name, email, password,confirmPassword,dob).then(
    (response) => {
      console.log(response)
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload:response
      });
      
    },
    (error) => {
      console.log(error)
       return dispatch({
          type: types.REGISTER_FAIL,
          payload:error
        });
        
      }
    );
  };


  // Login

  export const login = (email, password) => (dispatch) => {
    dispatch({type:types.LOGIN_START});
    return AuthService.login(email, password).then(
      (data) => {
        // console.log(data)
        return dispatch({
          type: types.LOGIN_SUCCESS,
          payload: data,
        });
      },
      (error) => {
        // console.log(error)
        return dispatch({
          type: types.LOGIN_FAIL,
          payload:error
        });
      }
    );
  };


  // logout

  export const logout = () => (dispatch) => {
    dispatch({type:types.LOGOUT_START});
    AuthService.logout().then(
      (data)=>{
        console.log(data)
        return dispatch({
          type:types.LOGOUT_SUCCESS,
          payload:{user:data}
        });
        
      },
      (error)=>{
        console.log(error)
       return dispatch({
          type:types.LOGIN_FAIL,
          payload:error
        });
        
      }
    )
  };