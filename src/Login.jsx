import { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./Config/Config";


function Login() {
  const [Email,setemail]=useState("");
  const [Password,setpassword]=useState("");
  const auth = getAuth(app);

const handlesignin=()=>{
signInWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    alert("sign in successful")
    // ...
  })
  .catch((error) => {
    console.log(error)
  });}
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Welcome Back</h2>
          <p>Sign in to continue.</p>

          <input onChange={(e)=>(setemail(e.target.value))} type="email" placeholder="Email" required />
          <input onChange={(e)=>(setpassword(e.target.value))} type="password" placeholder="Password" required/>

          <div className="forgot-password">
           <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button onClick={handlesignin}>Login</button>

          <p className="signup">
            Don't have an account? <a href="/">Sign Up</a>
          </p>
        </div>

        <div className="login-right">
        <img src="https://i.pinimg.com/736x/a3/6c/5b/a36c5ba435c6b3ce53cbf8253ae6ed66.jpg" alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;