import React, {useState} from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import '../common/style.css';

function Routes() {

    const [username, setusername] = useState("");
    const [mail, setmail] = useState("");
    const [img_url, setimg_url] = useState("");

    return (

        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"> <Home username={username} mail={mail} setmail={setmail} setusername={setusername} setimg_url={setimg_url} /> </Route>
                    <Route exact path="/login"> <Login setusername={setusername} setmail={setmail} setimg_url={setimg_url} /> </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
