import axios from "axios";

const API_URL = "http://13.215.50.140:3002/api/auth/admin";

const login = (username,password) => {
    return axios
    .post(API_URL + "/login", {
        username,password,
    })
    .then((response)=>{
        if (response.data.access_token){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        return response.data;
    })
}


const logout = () => {
    localStorage.removeItem("user");
}


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}


const authService = {
    login,logout,getCurrentUser,
}

export default authService;