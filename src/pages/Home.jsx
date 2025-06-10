import React from "react";
import "../css/Home.css"
import {useNavigate} from "react-router-dom"

function Home(){
    const navigate=useNavigate()

    return(
        <>
            <div className="container">
                <div className="first">
                    <img src="./nyra_logo.PNG" width="200" style={{borderRadius:"12px"}}/>
                     <h1 style={{textAlign:"center"}}>Weclome to the world of Nyra</h1>

                     <p style={{fontSize:"22px",fontWeight:"600"}}>chat with group</p>

                     <button style={{height:'42px',width:'fit-content',padding:'6px',backgroundColor:"#bdc3c7",fontWeight:'600',fontSize:'20px',border:'none',borderRadius:'10px',
                        boxShadow:" 2px 3px 5px black,5px 5px 5px blue,2px 2px 5px black"
                     }} onClick={()=>navigate("/login")}>Continue</button>
                </div>
            </div>
        </>
    )
}

export default Home;