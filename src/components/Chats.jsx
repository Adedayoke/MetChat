import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from '../context/ChatContext';
//import { CurrentChatContext } from "../context/CurrentChatContext";
import { NavigateContext } from "../context/NavigateContext";


function Chats() {
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
 // const {currentdata, currentdispatch} = useContext(CurrentChatContext)
  const {changeViewdispatch} = useContext(NavigateContext)
  const [chats, setChats] = useState([]);
 // const [onview, setonview] = useState(false);
  useEffect(()=>{
    
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db, "userChat", currentUser?.uid), (doc) => {
          setChats(doc?.data());
      });

      return ()=>{
        unsub();
      }
    }

    currentUser?.uid && getChats()
  }, [currentUser?.uid])

  const handleselect = (user)=>{
    dispatch({
      type: "CHANGE_USER",
      payload: user
    })
    // currentdispatch({
    //   type: "CHANGE_CURRENT_CHAT",
    //   payload: user
    // })
    changeViewdispatch({
      type: "CHANGE_VIEWING_STATE_FALSE",
    })
    console.log(user)
  }

    return (
      <div className="chats">
       {
        chats && 
        Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
          return( 
            <div key={chat[0]} className={"userChat"} onClick={()=>handleselect(chat[1].userInfo)}>
              <img src={chat[1].userInfo.photoURL} alt=""/>
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                {/* {<img src="" alt="" />} */}
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          )
          
        })
       }
      </div>
    );
  }
  
  export default Chats;
  