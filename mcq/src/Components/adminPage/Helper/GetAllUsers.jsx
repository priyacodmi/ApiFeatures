import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from 'Redux/AppReducer/action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "8px"
};


export default function AllUsers() {
  const [open, setOpen] = React.useState(false);
  const [role,setRole]=React.useState("user");
  const [userId,setUserId]=React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const users= useSelector(state=>state.AppReducer.users);
  const dispatch=useDispatch();


  const handleChange=(e)=>{
    setRole(e.target.value);
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch((updateUserRole(role,userId)));
      handleClose();
  }


  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  return (
    <>
     <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow style={{ background: "#757575" }}>
              <TableCell component="th" scope="row" style={{ fontSize: "20px", color: "white" }}>
                USER-NAME
              </TableCell>
              <TableCell component="th" scope="row" style={{ fontSize: "20px", color: "white" }}>
                EMAIL
              </TableCell>
              <TableCell style={{ width: 160, fontSize: "20px", letterSpacing: "1px", color: "white" }} align="center" >
                Role
              </TableCell>
              <TableCell style={{ width: 160, fontSize: "20px", letterSpacing: "1px", color: "white" }} align="center">
                MARKS
              </TableCell>
              <TableCell style={{ width: 160, fontSize: "20px", letterSpacing: "1px", color: "white" }} align="center">
                EDIT
              </TableCell>
              <TableCell style={{ width: 160, fontSize: "20px", letterSpacing: "1px", color: "white" }} align="center">
                REMOVE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    user
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {50}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button onClick={() => {
                      setUserId(user._id);
                      handleOpen();
                    }}><CreateIcon /></Button>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button color="error" onClick={()=>dispatch(deleteUser(user._id))}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
        >
          <Typography variant="h5" component="h5" color="gray" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: '24px',
            margin: '16px 0px',
            fontSize: '20px',
            letterSpacing: '0.18px',
            textAlign: "center"
          }}>
            Edit Role
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Select the Role</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="role"
                onChange={handleChange}
                value={role}
              >
                <Box display="flex" justifyContent="flex-start" style={{ width: '100%' }}>
                  <Box p={1} mx={3}>
                    <FormControlLabel value="client" name="role" control={<Radio />} label="Client" />
                  </Box>
                  <Box p={1} mx={3}>
                    <FormControlLabel value="admin" name="role" control={<Radio />} label="Admin" />
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change The Role
            </Button>
          </Box>
        </Box>
      </Modal>
    </>

  );
}



