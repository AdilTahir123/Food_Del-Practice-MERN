import React, { useState,useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from 'axios';
import { StoreContext } from "../context/StoreContext";
const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken}=useContext(StoreContext);
  const [currState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}));
  }
  const onLogin=async(event)=>{
    event.preventDefault();
    console.log("clicked");
    let newUrl=url;
    if(currState==='Login'){
      newUrl+="/api/user/login";
    }
    else
    {
      newUrl+="/api/user/register";
    }
    const response=await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }
  }
 
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign up" && (
            <input type="text" placeholder="enter name" name='name' value={data.name} onChange={onChangeHandler}  required />
          )}
          <input type="email" placeholder="email" name='email' value={data.email} onChange={onChangeHandler}   required />
          <input type="password" placeholder="password" name='password' value={data.password} onChange={onChangeHandler} required />
        </div>
        <button type="submit" className="login-popup-btn">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & conditions</p>
        </div>
        {currState == "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
