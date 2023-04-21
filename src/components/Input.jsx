import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from '../context/ChatContext'; 
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {v4 as uuid} from "uuid"
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";



function Input() {

  const [text, setText] = useState("")
  const [image, setimage] = useState("")

  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)


  const handleSend = async function(){
    if(image){
      const storageRef = ref(storage, uuid());
      await uploadBytes(storageRef, image).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), 
          {
             messages: arrayUnion({
              id: uuid(),
              text,
              senderId : currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          }
        )
        });
      })    
    }else{
      await updateDoc(doc(db, "chats", data.chatId), 
              {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId : currentUser.uid,
                  date: Timestamp.now(),
                })
              }
            )
    }
    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"] : {text},
      [data.chatId + ".date"] : serverTimestamp()
    })
    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"] : {text},
      [data.chatId + ".date"] : serverTimestamp()

    })
    setText("")
    setimage(null)
  }
    return (
      <div className="input">
        <input type="text" placeholder="Type something..." onChange={(e)=>setText(e.target.value)} value={text} />
        <div className="send">
          <img src={Attach} alt="" />
          <input onChange={(e)=> setimage(e.target.files[0])} style={{display:"none"}} type="file" name="" id="file" />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );
  }
  
  export default Input;
  