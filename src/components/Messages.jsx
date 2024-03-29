import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from '../context/ChatContext';
import { db } from "../firebase";
import Message from "./Message";
import { CurrentChatContext } from "../context/CurrentChatContext";

function Messages() {
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)
  const {currentdata} = useContext(CurrentChatContext)
    useEffect(()=>{
      
      const unsub = onSnapshot(doc(db, "chats", data?.chatId), (doc)=>{
        console.log(doc.exists())
        doc.exists() && setMessages(doc.data().messages);
        
     })
     return unsub
    }, [data?.chatId])
    

    return (
      <div className="messages">
         {
          messages?.map((message)=>{
            return(
              <Message message={message} key={message?.id}/>
            )
          })
         }
      </div>
    );
  } 
  
  export default Messages;
  