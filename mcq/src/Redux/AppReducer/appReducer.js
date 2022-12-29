import * as types from './action.type';


const initialState={
  isError:false,
  isLoading:false,
  users:[],
  clients:[]
}
export const AppReducer=(state=initialState, action)=>{
  const { type, payload } = action;
    switch(type){
      case types.FETCH_ALL_USERS_REQUEST:
        return{
          ...state,
          isLoading:true,
          isError:false 
        };

      case types.FETCH_ALL_USERS_SUCCESS:
        return{
          ...state,
          isLoading:false,
          isError:false,
          users:payload,
        };

      case types.FETCH_ALL_USERS_FAILURE:
        return{
          ...state,
          isLoading:false,
          isError:true
        };

        case types.FETCH_ALL_CLIENTS_REQUEST:
          return{
            ...state,
            isLoading:true,
            isError:false 
          };
  
        case types.FETCH_ALL_CLIENTS_SUCCESS:
          return{
            ...state,
            isLoading:false,
            isError:false,
            clients:payload,
          };
  
        case types.FETCH_ALL_CLIENTS_FAILURE:
          return{
            ...state,
            isLoading:false,
            isError:true
          };

        case types.DELETE_USER_REQUEST:
          return{
            ...state,
            isLoading:true,
            isError:false
          }
        
        case types.DELETE_USER_SUCCESS:
          return{
            ...state,
            isLoading:false,
            isError:false,
            users: state.users.filter(user => user._id !== payload)
          }

        case types.DELETE_USER_FAILURE:
          return{
            ...state,
            isLoading:false,
            isError:true
          }

          case types.UPDATE_USER_REQUEST:
            return{
              ...state,
              isLoading:true,
              isError:false
            }
          
          case types.UPDATE_USER_SUCCESS:
            return{
              ...state,
              isLoading:false,
              isError:false,
              users: state.users.map(user => user.role !== payload.role?{...user, role:payload.role}:user)
            }
  
          case types.UPDATE_USER_FAILURE:
            return{
              ...state,
              isLoading:false,
              isError:true
            }

      default:
        return state;
    }
}