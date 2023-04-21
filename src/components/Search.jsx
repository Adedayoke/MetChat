import { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc  } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Search() {
  const [username, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState("")


  const {currentUser} = useContext(AuthContext)
  const handleSearch = async function(){

    const colRef = collection(db, "users")
    const q = query(colRef, where("displayName", "==", username.toLowerCase()))
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    }catch(err){
      setErr(true)
    }
   
  };

  
  const handleKey = function(e){
    e.code === "Enter" && handleSearch()
  }
  const handleSelect = async function(){

    const combineId = currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid
    console.log(currentUser)
    console.log(user.uid)
    console.log(combineId)
    try{
      const res = await getDoc(doc(db, "chats", combineId));
      // console.log(!res.exists())

      if(!res.exists()){
        await setDoc(doc(db, "chats", combineId), {messages: []}) 

        console.log(res.exists())

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL
          }, [combineId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combineId+ ".userInfo"]: {
            uid: currentUser.uid,
            displayName:currentUser.displayName,
            photoURL: currentUser.photoURL
          }, [combineId+".date"]: serverTimestamp()
        });
      };
    }catch(err){
      // console.log(err)
    }
    setUser(null)
    setUserName("")
  }

    return (
      <div className="search">
        <div className="searchForm">
          <input placeholder="find a user" type="text" onKeyDown={handleKey} onChange={(e)=>setUserName(e.target.value) } value={username}/>
        </div> 
        {err && <p>User not found</p>}
        {user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt=""/>
          <div className="userChatInfo" >
            <span>{user.displayName}</span>
          </div>
        </div>}
      </div>
    );
  }
  
  export default Search;
  