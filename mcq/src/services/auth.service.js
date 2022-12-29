import axios from "axios";
import { localUrl} from "../constants/constants";

const API_URL = localUrl;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "api/users/login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password,confirmPassword,dob) {
    return axios.post(API_URL + "register", {
        name,
        email,
        password,
        confirmPassword,
        dob,
      
    }).then((response)=>{
      return response;
    });
  }
}

export default new AuthService();