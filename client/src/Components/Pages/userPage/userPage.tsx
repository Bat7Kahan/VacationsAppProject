import { Component } from "react";
import Vacation from "../../../Models/VacationModel";
import SingleVacationViewUser from "../../View/singleVacationViewUser/singleVacationViewUser";
import adminService from "../../../Services/AdminService";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import { History } from "history";
//----------------------------------
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
//----------------------------------
import "./userPage.css";



interface UserPageState{
    listOfVacations:Vacation[];
    errorMessage: string|null;
    errorOpen: boolean;
}

interface UserPageProps{
    location: {state:{userId:number, userName: string}};
    history : History;
}
class UserPage extends Component <UserPageProps, UserPageState>{

    constructor(props:UserPageProps){
        super(props); 
        console.log(this.props.location.state.userId);
        this.state = {listOfVacations:[], errorMessage: null, errorOpen: false};
    }

    private connect = () => {
        adminService.connect(() => {
            this.getListOfVacations();
        });
    }

    componentDidMount = async () => {       
        this.connect();
        this.getListOfVacations();
    }

    getListOfVacations = async () => {
        try {
            const response = await jwtAxios.get<Vacation[]>(`http://localhost:4000/user/vacationList/${this.props.location.state.userId}`);
            console.log(response.data);
            this.setState({listOfVacations:response.data});
        } catch (error:any) {
            this.setState({errorMessage: notify.error(error), errorOpen: true});
        }
    }

    logOut = () => {
        localStorage.removeItem("loginData");
        adminService.disconnect();
        this.props.history.push("/login");
    }

    public render(): JSX.Element {
        return (
            <div className="userPage"> 
                <AppBar position="static">
                <Toolbar>
                    <h4>Hello, {this.props.location.state.userName}</h4>
                    <Tab label="Log out" onClick={this.logOut}></Tab>                    
                </Toolbar>
                </AppBar>
				{this.state.listOfVacations && 
                this.state.listOfVacations.map(vacation => <SingleVacationViewUser userId={this.props.location.state.userId} vacation={vacation} history={this.props.history}/>)}
                <Dialog 
            open={this.state.errorOpen}
            aria-labelledby="modal-modal-title">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h4>{this.state.errorMessage}</h4>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { 
                         if(this.state.errorMessage == "Your login session has expired."){
                             this.props.history.push("/login");
                         }
                         else{
                            this.setState({ errorOpen: false, errorMessage: null }); 
                         }
                    }}>OK</Button>
                </DialogActions> 
            </Dialog>
            </div> 
        );
    }
}

export default UserPage;
