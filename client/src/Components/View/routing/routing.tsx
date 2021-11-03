import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminPage from "../../Pages/adminPage/adminPage";
import LoginPage from "../../Pages/loginPage/loginPage";
import SignupPage from "../../Pages/signupPage/signupPage";
import UserPage from "../../Pages/userPage/userPage";

import "./routing.css";

class Routing extends Component {
    public render(): JSX.Element {
        return (
            <div className="routing">
				<Switch>
                    <Route path="/signup" exact component={SignupPage}/> 
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/admin" exact component={AdminPage}/>
                    <Route path="/user" exact component={UserPage} /> 
                    <Redirect from="/" exact to="/login" />
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

function NotFound(){
    return (
        <pre>Route Not Found!!</pre> 
    );
}

export default Routing;
