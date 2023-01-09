import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

function Navbar() {

  const {currentUser, setCurrentUser} = useContext(AuthContext)

  const handleLogout = ()=>{
    signOut(auth).then(() => {
      const tent = {...auth}
      setCurrentUser(tent.currentUser)
          }).catch((error) => {
      });
  }

    return (
      <div className="navbar">
         <span className="logo">METLAD chat</span>
         <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
         </div>
      </div>
    );
  }
  
  export default Navbar;
  