import React, { useEffect, useState } from 'react'
import '../css/Chat.css'
import { collection, onSnapshot } from 'firebase/firestore'
import {useAuthState} from "react-firebase-hooks/auth"
import {db,auth} from "../firebase";
import { useNavigate } from 'react-router-dom';
import {doc,setDoc} from "firebase/firestore";

function Chat(){
    const [user] = useAuthState(auth)

    const[id,setId]=useState('')
    const[users,setUsers]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchusers=()=>{
            const users=collection(db,"users")

            onSnapshot(users,(snapshot)=>{
                const usersList=snapshot.docs.map(doc=>doc.data())
                setUsers(usersList)
            })
        }
        fetchusers();
    },[])

    const addToFirestore=async(u)=>{
            const userRef= doc(db,"users",u.uid);
            await setDoc(userRef,{
                uid:u.uid,
                //username: u.username ?? '',
                //phonenumber: u.phonenumber ?? '',
                email: u.email,
                //password: u.password ?? '',
                sendTo:id
            },{merge:true})
        }

    const editDetails=(u)=>{
            const user1=user;
            setId(u);
            if(id.length==0) return;
            console.log(id);
            addToFirestore(user1);
            navigate('/chatting')
        }

    return(
        <>
        <h1 style={{textAlign:'center',backgroundColor:'bisque',letterSpacing:'1.5px',fontWeight:'600'}}>Chat Group</h1>
        <div className='container'>
            {users.map((u,index)=>{
                const nn= (u.uid==user.uid)
                if(!nn){
                    return (
                    <button  onClick={()=>{editDetails(u.uid)}} key={index} style={{display:'flex',backgroundColor:'grey',flexDirection:'column',rowGap:'2px',width:'450px',borderRadius:'10px',cursor:'pointer'}}>
                    <h2>{u.username}</h2>
                    <h6><span>+91 </span>{u.phonenumber}</h6>
                    </button>
                    );
                }
            })}

        </div>
        </>
    )
}

export default Chat;