// import { getDefaultNormalizer } from "@testing-library/react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [errState, setErr] = useState(false)
  const {setCurrentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();
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
      setErr(true)
      setTimeout(()=>{
        setErr(false)
      })
    }
  }
  // adedayoke2006@gmail.com
  // Adedayo@2006
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">METLAD Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password" />
            <button>Login</button>
        </form>
        {errState && <span>Something went wrong</span> }
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
