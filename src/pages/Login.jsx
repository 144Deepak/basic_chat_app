import React,{useState} from "react";
import "../css/Login.css"
import { Link,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {db,auth} from "../firebase";
import {doc,setDoc} from "firebase/firestore";

function Login(){
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const userLogin=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
        const user = userCredential.user;
        alert("Logged in successfully") 
        navigate("/chat")
        // ...
        })
        .catch((error) => {
        alert("User doesn't exists or bad credentials")
        setEmail('')
        setPassword('')
        });
    }

    return(
        <>
         <div className="lgn_container">
                    <img src="./nyra_logo.PNG" width="200" style={{borderRadius:"12px"}}/>
        
                    <div className="login_form">
                        <h1>Login</h1>
        
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
        
                        <button id="login_btn" onClick={userLogin}>Login</button>        
        
                        <Link to="/signup" style={{textDecoration:'none',fontSize:"20px"}}>Not a registered user? Signup</Link>
                    </div>
                </div>
        </>
    )
}

export default Login;