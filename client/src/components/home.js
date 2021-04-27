import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Home(props) {

    useEffect(() => {
        // nothing 
    }, []);

    const logout = (e) => {
        props.setusername("");
        props.setmail("");
        props.setimg_url("");
    };
    
    return (
        <div className="flex-c-jc">
            <h1>Home page</h1>
            {
                props.username === "" ? (
                    <div className="flex-c-jc">
                        <div>Your are not authenticated</div>
                        <Link className="linker" to="/login">Login</Link>
                    </div> 
                ) : 
                (
                <div className="flex-c-jc">
                    <div> Welcome <b> {props.username} </b> </div>
                    <div> Email : {props.mail} </div>
                    <button onClick={logout} className="linker">Logout</button>
                </div>
                )
            }
        </div>
    )
}
