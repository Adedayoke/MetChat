import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useContext, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

function Register() {
  const [errState, setErr] = useState(false)
  const navigate = useNavigate()
  const {setCurrentUser} = useContext(AuthContext)
  const [loaderState, setLoaderState] =  useState(false)

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
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `${file.name}`);
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
        }).catch(ErrorFunction())
      }).catch(ErrorFunction())
    }catch(err){
      ErrorFunction()
    }
    
      
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">HEchat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="display name"/>
            <input required type="email" placeholder="email"/>
            <input required type="password" placeholder="password" />
            <input required style={{display:"none"}}  type="file" id="file"/>
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add An Avatar</span>
            </label>
            {!loaderState ? <button>Sign Up</button> :
            <Loader />}
            {errState && <div className="error">Something went wrong</div> }
        </form>
        <p>You do have an account? <Link to="/login">
        Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
