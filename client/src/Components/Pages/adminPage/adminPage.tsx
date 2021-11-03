import { Component, Fragment } from "react";
import Vacation from "../../../Models/VacationModel";
import AddVacation from "../../View/addVacation/addVacation";
import EditVacation from "../../View/editVacation/editVacation";
import Reports from "../../View/reports/reports";
import adminService from "../../../Services/AdminService";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import { History } from "history";
//-----------------------------
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from "moment";
import { CssBaseline } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
//-----------------------------
import "./adminPage.css";

interface AdminPageState{
    listOfVacations: Vacation[];
    display: "List"|"Add"|"Reports"|"Edit";
    vacationToEdit: Vacation|undefined;
    errorMessage: string|null;
    errorOpen: boolean;
}

interface AdminPageProps{
    history: History;
}

class AdminPage extends Component <AdminPageProps, AdminPageState>{

    constructor(props: AdminPageProps){
        super(props);
        this.state = {listOfVacations: [], errorMessage: null, display:"List", vacationToEdit: undefined, errorOpen: false};
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

    componentDidUpdate = async (prevProps: {},prevState: AdminPageState) => {
        if(this.state.display != prevState.display && (this.state.display == "List")){
            console.log("in here");
            this.getListOfVacations(); 
        }
    }

    getListOfVacations = async () => {
        try{
            const response = await jwtAxios.get<Vacation[]>("http://localhost:4000/admin/vacationList");
            this.setState({listOfVacations: response.data, display: "List"});
        }
        catch(error){
            this.setState({errorMessage:notify.error(error), errorOpen: true});
        }
    }


    editVacation = (vacation:Vacation) => {
        this.setState({display:"Edit", vacationToEdit:vacation});
    }

    deleteVacation = async (id: number) => {
        try {
            const response = await jwtAxios.delete(`http://localhost:4000/admin/deleteVacation/${id}`);
            this.setState({display: "List"});
        } catch (error) {
            this.setState({errorMessage:notify.error(error), errorOpen: true});
        }
    }

    addVacation = () => {
        this.setState({display:"Add"});
    }

    reports = () => {
        this.setState({display:"Reports"});
    }

    logOut = () => {
        localStorage.removeItem("loginData");
        adminService.disconnect();
        this.props.history.push("/login");
    }
    
    public render(): JSX.Element {
        return (
            <div className="adminPage">
                <CssBaseline />
                <AppBar position="static">
                <Toolbar>
                    <h4>Hello, Admin!</h4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {(this.state.display == "List" || this.state.display == "Reports" || this.state.display == "Edit") && <Tab color="inherit" label="Add New Vacation" onClick={() => this.setState({display: "Add"})}/>}
                    {(this.state.display == "Reports" || this.state.display == "Add" || this.state.display == "Edit") && <Tab label="Go To List" onClick={() => this.setState({display:"List"})}/>}
                    {(this.state.display == "List" || this.state.display == "Add" || this.state.display == "Edit") && <Tab color="inherit" label="Reports" onClick={() => this.setState({display: "Reports"})}/>}
                    <Tab label="Log out" onClick={this.logOut}></Tab>
                </Toolbar>
                </AppBar>
                {this.state.display == "List" && this.state.listOfVacations.length != 0 &&<Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Destination</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Followers</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.listOfVacations.map((vacation) => (
                                <TableRow
                                    key={vacation.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                       <img src={`http://localhost:4000/images/${vacation.image}`} width="60px" height="60px"></img>
                                    </TableCell>
                                    <TableCell align="right">{vacation.description}</TableCell>
                                    <TableCell align="right">{vacation.destination}</TableCell>
                                    <TableCell align="right">{moment(vacation.start_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{moment(vacation.end_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{vacation.price}</TableCell>
                                    <TableCell align="right">{vacation.followers}</TableCell>
                                    <TableCell align="right"><Button onClick={() => this.editVacation(vacation)}><EditOutlinedIcon/></Button></TableCell>
                                    <TableCell align="right"><Button onClick={() => this.deleteVacation(vacation.id)}><DeleteOutlineOutlinedIcon/></Button></TableCell> 
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></Fragment>}
                {this.state.display == "Add" && <AddVacation history={this.props.history}/>}
                {this.state.display == "Edit" && <EditVacation history={this.props.history} vacation={this.state.vacationToEdit}/>}
                {this.state.display == "Reports" && <Reports history={this.props.history}/>} 
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

export default AdminPage; 
