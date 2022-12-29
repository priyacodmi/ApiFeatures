import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const AuthRequired=({children})=>{
  const isLoggedIn=useSelector(state=>state.AuthReducer.isLoggedIn);
  console.log(isLoggedIn)

  if(!isLoggedIn){
    return <Navigate to="/signin" replace={false}/>
  }
  return children;
}