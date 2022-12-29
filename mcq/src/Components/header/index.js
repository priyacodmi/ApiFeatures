import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import API from "services/axios";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  let navigate = useNavigate();
  let [userRole, setUserRole] = useState("");
  let [userToken, setUserToken] = useState("");
  let [profileStatus, setProfileStatus] = useState(false);

  let role = Cookies.get("userRole");
  let token = Cookies.get("token");

  useEffect(() => {
    setUserRole(role);
    setUserToken(token);
  }, [token]);
  const location = useLocation();

  const handleClose = () => {
    API.post("/users/logout")
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          toast.success(response.data.msg);
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].msg, "error");
        toast.error(error.response.data.errors[0].msg);
      });
  };

  return (
    <header className="header_outer">
      <div className="header_inner">
        <div className="nav_header_outer">
          <div className="nav_logo">
            <a className="logo_link" href="/">
              <h2>MCQ's</h2>
            </a>
          </div>
          <section className="nav_middle">
            <div className="nav_links">
              <ul className="nav_ul">
                <li className="nav_li">
                  <Link className="link" to="/">
                    Home
                  </Link>
                </li>
                {(location.pathname === "/signin" || location.pathname === "/") && !userToken ? (
                  <li className="nav_li">
                    <Link className="link" to="/signin">
                      SignIn
                    </Link>
                  </li>
                ) : (
                  location.pathname === "/registration" && (
                    <li className="nav_li">
                      <Link className="link" to="/registration">
                        Registration
                      </Link>
                    </li>
                  )
                )}
                {userRole === "client" ? (
                  <>
                    <li className="nav_li">
                      <Link className="link" to="/question">
                        Questions
                      </Link>
                    </li>
                    <li className="nav_li">
                      <Link className="link" to="/clientTrail">
                        Trails
                      </Link>
                    </li>
                  </>
                ) : (
                  userRole === "user" && (
                    <li className="nav_li">
                      <Link className="link" to="/userTrail">
                         Trails
                      </Link>
                    </li>
                    
                  )
                )}
                {userToken && (
                  <>
                    {userRole === "client" ? (
                      <li className="nav_li">
                        <Link className="link" to="/client">
                          Client
                        </Link>
                      </li>
                    ) : userRole === "admin" ? (
                      <li className="nav_li">
                        <Link className="link" to="/admin">
                          Admin
                        </Link>
                      </li>
                    ) : (
                      userRole === "user" && (
                        <li className="nav_li">
                          <Link className="link" to="/user">
                            user
                          </Link>
                        </li>
                      )
                    )}

                    <li className="nav_li">
                      <Link className="link" onClick={handleClose}>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </header>
  );
}

export default Header;
