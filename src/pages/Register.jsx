import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useContext, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [errState, setErr] = useState(false)
  const navigate = useNavigate()
  const {setCurrentUser} = useContext(AuthContext)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
            
          await updateProfile(res.user, {
            displayName: displayName.toLowerCase(),
            photoURL: downloadURL
          })
          await setDoc(doc(db, "users", res.user.uid), {
            uid:res.user.uid,
            displayName: displayName.toLowerCase(),
            email:email,
            photoURL:downloadURL
          }).catch((e)=>{
            console.log(e)
          })
          
          await setDoc(doc(db, "userChat", res.user.uid), {});
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setCurrentUser(user)
            }
          }); 
          navigate("/")
        }).catch((error)=>{
          setErr(true)
            setTimeout(()=>{
              setErr(false)
            })
        })
      }).catch((error)=>{
        setErr(true)
          setTimeout(()=>{
            setErr(false)
          })
      })
    }catch(err){
      setErr(true)
      setTimeout(()=>{
        setErr(false)
      })
    }
    
      
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">METLAD Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password" />
            <input style={{display:"none"}}  type="file" id="file"/>
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add An Avatar</span>
            </label>
            <button>Sign Up</button>
            {errState && <span>Something went wrong</span> }
        </form>
        <p>You do have an account? <Link to="/login">
        Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
