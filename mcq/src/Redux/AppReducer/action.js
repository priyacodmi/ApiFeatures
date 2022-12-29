import * as types from "./action.type";
import API from "../../services/axios";


// Get All Users
export const getAllUsers=()=>(dispatch)=>{
  dispatch({type:types.FETCH_ALL_USERS_REQUEST});
  return API.get(`/users/all`)
  .then((response)=>{
    return dispatch({type:types.FETCH_ALL_USERS_SUCCESS, payload:response.data.users})
  })
  .catch((error)=>{
    return dispatch({type:types.FETCH_ALL_USERS_FAILURE,payload:error})
  })
}

export const fetchUsersRequest=()=>{
    return{
      type:types.FETCH_ALL_USERS_REQUEST
    }
}

export const fetchUsersSucces=()=>{
  return{
    type:types.FETCH_ALL_USERS_SUCCESS
  }
}

export const fetchUsersFailure=()=>{
  return{
    type:types.FETCH_ALL_USERS_FAILURE
  }
}


// Delete a user
export const deleteUser=(id)=>(dispatch)=>{
  console.log(id)
  dispatch({type:types.DELETE_USER_REQUEST,id:id});
  return API.delete(`/users/delete/${id}`)
  .then((response)=>{
    return dispatch({type:types.DELETE_USER_SUCCESS,payload:response})
  })
  .catch((error)=>{
    return dispatch({type:types.DELETE_USER_FAILURE, payload:error})
  })
}

export const deleteUsersRequest=(id)=>{
  return{
    type:types.DELETE_USER_REQUEST,
    id:id
  }
}

export const deleteUsersSucces=(id)=>{
return{
  type:types.DELETE_USER_SUCCESS,
  id:id
}
}

export const deleteUsersFailure=(id)=>{
return{
  type:types.DELETE_USER_FAILURE,
  id:id
}
}



// Update User/Client Role
export const updateUserRole=(role,userId)=>(dispatch)=>{
  dispatch({type:types.UPDATE_USER_REQUEST});
  return API.put(`/users/changeRole`,{role,userId})
  .then((response)=>{
    console.log(response)
    return dispatch({type:types.UPDATE_USER_SUCCESS,payload:{role,userId}})
  })
  .catch((error)=>{
    console.log(error)
    return dispatch({type:types.UPDATE_USER_FAILURE, payload:error})
  })
}

export const updateUserRequest=()=>{
  return{
    type:types.UPDATE_USER_REQUEST,
  }
}

export const updateUserSucces=()=>{
return{
  type:types.UPDATE_USER_SUCCESS,
}
}

export const updateUserFailure=()=>{
return{
  type:types.UPDATE_USER_FAILURE,
}
}





// Get All CLients
export const getAllClients=()=>(dispatch)=>{
  dispatch({type:types.FETCH_ALL_CLIENTS_REQUEST});
  return API.get(`/users/all`)
  .then((response)=>{
    return dispatch({type:types.FETCH_ALL_CLIENTS_SUCCESS, payload:response.data.clients})
  })
  .catch((error)=>{
    return dispatch({type:types.FETCH_ALL_CLIENTS_FAILURE,payload:error})
  })
}

export const fetchClientsRequest=()=>{
    return{
      type:types.FETCH_ALL_CLIENTS_REQUEST
    }
}

export const fetchClientsSucces=()=>{
  return{
    type:types.FETCH_ALL_CLIENTS_SUCCESS
  }
}

export const fetchClientsFailure=()=>{
  return{
    type:types.FETCH_ALL_CLIENTS_FAILURE
  }
}