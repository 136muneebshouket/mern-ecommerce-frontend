import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  checkApiStatusoflogin,
  checkApiStatusofsignup,
} from "./components/signup/Api_statusof_userauthentication";
import axios from "axios";
import Header from "./components/header/Header";
import HOME from "./components/pages/hompage/HOME";
import Carts from "./components/pages/cart/Carts";
import Signup from "./components/signup/Signup";
import Sell from "./components/pages/sell/Sell";
import Cartpage from "./components/pages/cartpage/Cartpage";
import Catogerynavbar from "./components/header/Catogerynavbar";

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
// });

const URL = "http://localhost:8000";

// let AccessToken;

// Function to get JWT token from local storage
function getAccessToken() {
  return localStorage.getItem("usertoken");
}

//  Function to get refresh token from local storage
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Function to set new tokens in local storage
function setTokens(accessToken) {
  localStorage.setItem("usertoken", accessToken);
  // localStorage.setItem('refreshToken', refreshToken);
  // AccessToken = accessToken;
}

// Function to clear tokens from local storage
function clearTokens() {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("refreshToken");
}

// let login = checkApiStatusoflogin();
// console.log(login)

// let signup = checkApiStatusofsignup();
// console.log(signup)

// let refresh_token = localStorage.getItem('refreshToken');
// let access_token = localStorage.getItem('usertoken');

if (getAccessToken() && getRefreshToken()) {
  // // Axios Interceptor
  axios.interceptors.request.use(async (config) => {
    console.log("interceptor config hitted");
    const token = getAccessToken();
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authtokken = token;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      //   // TODO: do custom logics here.
      console.log("Response Interceptor");
      console.log(response);
      //   // setEMAIL(data.email)
      return response;
    },
    async (error) => {
      console.log("interception error");
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.data === "Invalid access token"
      ) {
        console.log(error.response.status);
        //     // JWT token has expired, try to obtain a new token with the refresh token
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          // No refresh token available, prompt user to log in again
          // clearTokens();
          console.log("reloaded error 1 intercepters");
          // window.location.reload();
        } else {
          return axios
            .post(`${URL}/api/refreshtoken/token`, { refreshToken })
            .then((response) => {
              const { accessToken } = response.data;
              setTokens(accessToken);

              // console.log(accessToken);
              // Retry the original request with the new JWT token
              const config = error.config;
              config.headers.Authorization = `Bearer ${accessToken}`;
              return axios.request(config);
            })
            .catch((error) => {
              // Refresh token is invalid or has expired, prompt user to log in again
              console.log("reloaded error 2 intercepters");
              // clearTokens();
              // window.location.reload();
            });
        }
      }
      return Promise.reject(error);
    }
  );
}

function App() {
  // const api = axios.create();

  // const [Appreload, setAppreload] = useState(true);

  const [EMAIL, setEMAIL] = useState(null);
  const [CARTLENGTH, setCARTLENGTH] = useState(0);

  const URL = "http://localhost:8000";

  const getuserdata = async () => {
    // let userid = localStorage.getItem("userid");

    //post request to authenticate user

    await axios
      .post(`${URL}/api/auth/getuser`)
      .then((res) => {
        console.log(res);

        // setEMAIL(res.data.email)
        // console.log(EMAIL);
        // const userid = res.data._id;
        // if (userid) {
        //   axios
        //     .get(`${URL}/api/carts/getcarts/${userid}`)
        //     .then((res) => {
        //       // console.log(res.data[0].product.title)
        //       setCARTLENGTH(res.data.length);
        //       // console.log(res.data.length);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getuserdata();

    // Request a new access token periodically using the refresh token
    // const interval = setInterval(() => {
    //   const refreshToken = getRefreshToken();
    //   if (refreshToken) {
    //     api.post(`${URL}/api/refreshtoken/token`, { refreshToken }).then(response => {
    //       const { accessToken } = response.data;
    //       console.log(response.data)
    //       setTokens(accessToken);
    //     }).catch(error => {
    //       clearTokens();
    //       console.log("reloaded error 1 interval")
    //       // window.location.reload();
    //     });
    //   } else {
    //     clearTokens();
    //     console.log("reloaded error 2 interval")
    //     // window.location.reload();
    //   }
    // }, 60 * 1000); // Refresh token every 30 minutes

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(interval);
  }, []);

  const [VALUE, setVALUE] = useState("");

  const pull_data = (data) => {
    setVALUE(data);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header usercarts={CARTLENGTH} useremail={EMAIL} />

        <Routes>
          <Route element={<HOME func={pull_data} />} path="/"></Route>
        </Routes>

        <Routes>
          <Route element={<Carts />} path="/Carts"></Route>
        </Routes>
        <Routes>
          <Route element={<Signup />} path="/signup"></Route>
        </Routes>
        <Routes>
          <Route element={<Sell />} path="/Sell"></Route>
        </Routes>
        <Routes>
          <Route element={<Cartpage cart={VALUE} />} path="/cartpage"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
