import React,{useState} from "react";
import "../css/Signup.css"
import { Link,useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {db,auth} from "../firebase";
import {doc,setDoc} from "firebase/firestore";


function Signup(){
    const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[username,setUsername]=useState('')
    const[phonenumber,setPhoneNumber]=useState('')

    const addToFirestore=async(u)=>{
        const userRef= doc(db,"users",u.uid);
        await setDoc(userRef,{
            uid:u.uid,
            username:username,
            phonenumber:phonenumber,
            email:u.email,
            password:password
        },{merge:true})
    }


    const createUser=()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            addToFirestore(user)
            alert("Registered successfully, you can login now")
            navigate("/login") 

            // ...
        })
        .catch((error) => {
            alert("User already exists or bad credentials")
            setEmail('')
            setPassword('')
            setUsername('')
            setPhoneNumber('')
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return(
        <>
        <div className="lgn_container">
            <img src="./nyra_logo.PNG" width="200" style={{borderRadius:"12px"}}/>

            <div className="login_form">
                <h1>Sign up</h1>

                <div style={{width:'100%'}}>
                    <label id="id1">Username:</label>
                    <input type="text" 
                    placeholder="Enter your name"
                    id="inp" 
                    value={username}
                    onChange={(event)=>{setUsername(event.target.value)}}/>
                </div> 

                <div style={{width:'100%'}}>
                    <label id="id1">Phone Nunber:</label>
                    <input type="text" 
                    placeholder="Enter your phonenumber"
                    id="inp" 
                    value={phonenumber}
                    onChange={(event)=>{setPhoneNumber(event.target.value)}}/>
                </div> 

                <div style={{width:'100%'}}>
                    <label id="id1">Email:</label>
                    <input type="email" 
                    placeholder="Enter your email"
                    id="inp" 
                    value={email}
                    onChange={(event)=>{setEmail(event.target.value)}}/>
                </div> 

                <div style={{width:'100%'}}>
                    <label id="id1">Password:</label>
                    <input type="password" 
                    placeholder="Enter your password"
                    id="inp" 
                    value={password}
                    onChange={(event)=>{setPassword(event.target.value)}}/>
                </div> 

                <button id="login_btn" onClick={createUser}>Signup</button>        

                <Link to="/login" style={{textDecoration:'none',fontSize:"20px"}}>Already registered? Login</Link>
            </div>
        </div>
        </>
    )
}

export default Signup;