import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./components/axios_interceptor/api_interceptor";
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


function App() {
  // const api = axios.create();

  // const [Appreload, setAppreload] = useState(true);

  const [EMAIL, setEMAIL] = useState(null);
  const [CARTLENGTH, setCARTLENGTH] = useState(0);

  const URL = "http://localhost:8000";

  const getuserdata = async () => {
    // let userid = localStorage.getItem("userid");

    //post request to authenticate user

    await axiosInstance.post(`${URL}/api/auth/getuser`)
      .then((res) => {
        // console.log(res);

        setEMAIL(res.data.email)
        // console.log(EMAIL);
        const userid = res.data._id;
        if (userid) {
          axios.get(`${URL}/api/carts/getcarts/${userid}`)
            .then((res) => {
              // console.log(res.data[0].product.title)
              setCARTLENGTH(res.data.length);
              // console.log(res.data.length);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  };

  useEffect(() => {
    getuserdata();


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
