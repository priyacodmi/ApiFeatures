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
import "./userPage.css";
const drawerWidth = 350;

const UserPage = () => {
  let [resultData, setResultData] = useState(null);
  let [nameOfTrail, setNameofTrail] = useState("");
  let [allQuestions, setAllQuestions] = useState(null);

  useEffect(() => {
    API.get("/question/all/users")
      .then((response) => {
        if (response.status === 200) {
          setAllQuestions(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].msg, "error");
        toast.error(error.response.data.errors[0].msg);
      });
  }, []);

  useEffect(() => {
    API.get("/result/user/trails")
      .then((response) => {
        if (response.status === 200) {
          setResultData(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].msg, "error");
        toast.error(error.response.data.errors[0].msg);
      });
  }, []);

  const handleList = (e) => {
    setNameofTrail(e.target.textContent);
  };

  useEffect(() => {
    if (resultData?.result[0]) {
      setNameofTrail(resultData?.result[0]?.trails.trailName);
    }
  }, [resultData]);

  let [requiredResult, setRequiredResult] = useState(null);

  useEffect(() => {
    const trailResultData =
      nameOfTrail !== "" &&
      resultData?.result?.filter((item) => {
        return item.trails.trailName === nameOfTrail;
      });
    setRequiredResult(trailResultData[0]);
  }, [nameOfTrail]);

  const getOnlyArray = (id) => {
    if(allQuestions !== null){
      return allQuestions.questions?.filter((s) => s._id === id)
    }   
}

  const drawer = (
    <>
      <Typography variant="h6" noWrap component="div">
        Trails Name
      </Typography>
      <Divider />
      <List>
        {resultData?.result?.map((item, index) => (
          <ListItem
            key={item.trails.trailName}
            disablePadding  
          >
            <ListItemButton>
              <ListItemIcon>{index + 1}</ListItemIcon>
              <ListItemText onClick={handleList} primary={item.trails.trailName} />
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
              {requiredResult &&
                requiredResult !== null &&
                requiredResult !== undefined && (
                  <>
                    {requiredResult?.userAnwers?.map((item,id) => (
                      <div className="question_outer">
                        <div className="question_upper_wrapper">
                          <div className="question_upper">{` Question ${
                            id + 1
                          } `}</div>
                        </div>
                        <div className="question_lower">
                          <div className="question_lower_container">
                            <div className="question_lower_container_upper">
                              {getOnlyArray(item.question)[0]?.questionText}
                            </div>
                          </div>
                          <div className="question_container_lower">
                              Selected Answer
                              
                                {item.selectedAnswer.map((item)=>(
                                  <button className="btn_option1">
                                   {item}
                                  </button>
                                ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
            </div>
          </div>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPage;
