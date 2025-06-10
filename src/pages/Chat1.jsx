import React, { useEffect, useState } from 'react'
import '../css/Chat1.css'
import { collection, onSnapshot,addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore'
import {useAuthState} from "react-firebase-hooks/auth"
import {db,auth} from "../firebase";
import { useNavigate } from 'react-router-dom';
import {doc,setDoc} from "firebase/firestore";


function Chat1(){
    const [user] = useAuthState(auth)
    
    const[users,setUsers]=useState([])
    const navigate=useNavigate()
    const[messages,setMessages]=useState([])
    const[newMessage,setNewMessage]=useState('')
    const[sender,setSender]=useState()
    const[reciever,setReceiver]=useState()
    const[rid,setRId]=useState()

    const handleSendMessage = async (e)=>{
     e.preventDefault();

    if(newMessage.trim()==='') return;
      const messageRef = collection(db, 'chats','room1','messages')
        //console.log(messageRef)
      await addDoc(messageRef,{
        sender:user.uid,
        reciever:rid,
        message:newMessage.trim(),
        timestamp:serverTimestamp()
      });
      setNewMessage('') 
  }

    useEffect(()=>{
            const fetchusers=()=>{
                const users=collection(db,"users")
    
                onSnapshot(users,(snapshot)=>{
                    const usersList=snapshot.docs.map(doc=>doc.data())
                    setUsers(usersList)
                })
                console.log(users.length)
            }
            fetchusers();
        },[])

    useEffect(() => {
    if (users.length > 0 && user) {
        const currentUser = users.find((u) => u.uid === user.uid);
        if (currentUser?.sendTo) {
            setRId(currentUser.sendTo);
        }
    }
    }, [users, user]);

    useEffect(()=>{
    const msgRef = collection(db,'chats','room1','messages');
    const q = query(msgRef, orderBy('timestamp'))

    const unsubscribe = onSnapshot(q,(snapshot)=>{
      const msgs = snapshot.docs.map((doc)=>doc.data());
      setMessages(msgs)
    });
    return()=> unsubscribe();    
  },[]);

    return(
        <>
        {users.map((u,index)=>{
                const nn= (u.uid==rid)
                if(nn){
                    return (
                    <h2 key={index} style={{backgroundColor:'lightgrey',textAlign:'center'}}>{u.username.charAt(0).toUpperCase() + u.username.slice(1)}</h2>
                    );
                }
        })}
        <div className='container'>
            <div className='chats'>
              {messages.length===0 ? (<p></p>):(
                messages.map((msg,index)=>{
                  const s = user.uid===msg.sender;
                  const r =  rid===msg.reciever;
                  if(s && r){
                    return(
                        <div key={index} style={{textAlign:'right'}}>
                            <strong>{msg.message}</strong>
                        </div>
                    );
                }
                const s1 = user.uid===msg.reciever;
                const r1=  rid===msg.sender;
                  if(s1 && r1){
                    return(
                        <div key={index} style={{textAlign:'left'}}>
                            <strong>{msg.message}</strong>
                        </div>
                    );
                }
                })
              )}
          </div>


        <form onSubmit={handleSendMessage} style={{display:"flex", columnGap:"5px", flexWrap:"wrap"}}>
              <input
              style={{height:'35px', width:"300px", border:"none",outline:"none", fontSize:"20px", paddingLeft:"10px", borderRadius:"15px"}}
              placeholder='Enter your message'
              value={newMessage}
              onChange={(event)=>{setNewMessage(event.target.value)}}
              />

              <button type='submit' style={{height:"35px", backgroundColor:"coral", color:"white", width:"fit-content",padding:"2px", borderRadius:"8px",letterSpacing:"1.5px",fontWeight:"700", border:"none"}}>Send</button>
          </form>
          </div>
        </>
    )
}
export default Chat1;