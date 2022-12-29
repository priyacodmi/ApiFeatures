import React, { useState, useEffect } from "react";
import API from "services/axios";
import { ToastContainer, toast } from "react-toastify";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import "./userTrail.css";
const drawerWidth = 350;

const UserTrail = () => {
  let [trails, sertTrails] = useState(null);
  let [trailName, sertTrailName] = useState("");

  let [requiredTrailQuestions, setRequiredTrailQuestions] = useState(null);

 

  useEffect(() => {
    API.get("/trails/all")
      .then((response) => {
        if (response.status === 200) {
          sertTrails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].msg, "error");
        toast.error(error.response.data.errors[0].msg);
      });
  }, []);

  const handleList = (e) => {
    sertTrailName(e.target.textContent);
  };
  useEffect(() => {
    if (trails?.trails[0]) {
      sertTrailName(trails?.trails[0].trailName);
    }
  }, [trails]);

  useEffect(() => {
    const questionsData =
      trailName !== "" &&
      trails?.trails?.filter((item) => {
        return item.trailName === trailName;
      });
    setRequiredTrailQuestions(questionsData);
  }, [trailName]);

  const drawer = (
    <>
      <Typography variant="h6" noWrap component="div">
        Trails Name
      </Typography>
      <Divider />
      <List>
        {trails?.trails?.map((item, index) => (
          <ListItem key={item.trailName} disablePadding >
            <ListItemButton>
              <ListItemIcon>{index + 1}</ListItemIcon>
              <ListItemText onClick={handleList} primary={item.trailName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Typography paragraph>
          <div className="section_question">
            <div className="question_layout">
              {requiredTrailQuestions !== null &&
                requiredTrailQuestions[0]?.questions.map((item, id) => (
                  <div className="question_outer">
                    <div className="question_upper_wrapper">
                      <div className="question_upper">{` Question ${
                        id + 1
                      } `}</div>
                    </div>
                    <div className="question_lower">
                      <div className="question_lower_container">
                        <div className="question_lower_container_upper">
                          {item.questionText}
                        </div>
                      </div>
                      <div className="question_container_lower">
                        {item?.options?.map((items, id) => (
                          <button className="btn_option1" value={items}>
                            {`${id + 1} - ${items}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="submit">
              <button className="submit_button">Submit</button>
            </div>
          </div>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserTrail;
