// import { getDefaultNormalizer } from "@testing-library/react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

function Login() {
  const [errState, setErr] = useState(false)
  const {setCurrentUser} = useContext(AuthContext)
  const [loaderState, setLoaderState] =  useState(false)

  const navigate = useNavigate()

  const ErrorFunction = () => {
    setErr(true)
      setLoaderState(false)
      setTimeout(()=>{
        setErr(false)
      }, 3000)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoaderState(true)
    const email = e.target[0].value
    const password = e.target[1].value
    
    try{
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user)
          navigate("/")
        }
    }); 
    }catch(err){
      ErrorFunction()
    }
  }
  // adedayoke2006@gmail.com
  // Adedayo@2006
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">HEchat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="email"/>
          <input required type="password" placeholder="password" />
          {
            !loaderState ? 
            <button>Login</button>:
            <Loader />
          }
        </form>
        {errState && <div className="error">Something went wrong</div> }
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
