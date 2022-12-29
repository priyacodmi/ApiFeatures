import Link from '@mui/material/Link';
import React, { useRef, useState } from "react";
import AllUsers from "./Helper/GetAllUsers";
import { Box } from "@mui/system";
import { AllClients } from './Helper/GetAllClients';
import { Typography } from '@mui/material';




function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MCQ Test website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

const AdminPage = () => {
  const [button1,setButton1]=useState("users");
  const [button2,setButton2]=useState("");

  const refUsers=useRef();
  const refClients=useRef();

  return(
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Box sx={{ display: 'flex', flexDirection:'column',width: '15%', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Link to="/usersList" underline="none" sx={{cursor:"pointer"}}>
        <Item ref={refUsers} onClick={()=>{
            setButton1("users");
            setButton2("");
          }}>Users</Item>
        </Link>
         <Link to="/clientsList" underline="none" sx={{cursor:"pointer"}}>
         <Item ref={refClients} onClick={()=>{
            setButton1("");
            setButton2("clients");
          }}>Clients</Item>
         </Link>
        
        </Box>
        <Item sx={{ width: '85%' }}>
          
        {button1 === "users" && <AllUsers/>}
             {button2 === "clients" && <AllClients/>}
        </Item>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </div>
    
)};

export default AdminPage;

