import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    }
    else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login__spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className="login">
      <img src={logo} alt="" className="login__logo" />
      <div className="login__form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input value={name} onChange={(event) => {setName(event.target.value)}} type="text" placeholder="Your Name" />
          ) : (
            <></>
          )}
          <input value={email} onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder="Email" />
          <input value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder="Password" />
          <button onClick={user_auth} type="submit" >{signState}</button>
          <div className="form__help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form__switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;