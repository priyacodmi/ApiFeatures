import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients } from 'Redux/AppReducer/action';



export const AllClients=()=> {
  const clients=useSelector(state=>state.AppReducer.clients);
  const dispatch=useDispatch();

  React.useEffect(() => {
   dispatch(getAllClients());
  }, [dispatch]);

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow style={{ background: "#757575" }}>
            <TableCell component="th" scope="row" style={{ fontSize: "20px", color: "white" }}>
              CLIENT-NAME
            </TableCell>
            <TableCell component="th" scope="row" style={{ fontSize: "20px", color: "white" }}>
              EMAIL
            </TableCell>
            <TableCell style={{ width: 160, fontSize: "20px", letterSpacing: "1px", color: "white" }} align="center" >
              Role
            </TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell component="th" scope="row">
                {client.name}
              </TableCell>
              <TableCell component="th" scope="row">
              {client.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Client
              </TableCell>  
            </TableRow>
          ))}   
        </TableBody>   
      </Table>
    </TableContainer>
    
    </> 
  );
}



