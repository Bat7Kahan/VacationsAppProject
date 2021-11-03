import { Component, SyntheticEvent } from "react";
import axios from "axios";
import User from "../../../Models/UserModel";
import { History } from "history";
import notify from "../../../Services/Notify";
//---------------------
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//---------------------
import "./loginPage.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, Modal } from "@material-ui/core";
import { tsThisType } from "@babel/types";

interface LoginPageState {
    username: string,
    password: string,
    errorMessage: string | null,
    errorOpen: boolean
}

interface LoginPageProps {
    history: History;
}


class LoginPage extends Component<LoginPageProps, LoginPageState>{

    constructor(props: LoginPageProps) {
        super(props);
        this.state = { username: "", password: "", errorMessage: null, errorOpen: false };
    }

    handleUsernameChange = (e: SyntheticEvent) => {
        const username = (e.target as HTMLInputElement).value;
        this.setState({ username: username });
    }

    handlePasswordChange = (e: SyntheticEvent) => {
        const password = (e.target as HTMLInputElement).value;
        this.setState({ password: password });
    }

    login = async () => {
        //this.setState({errorMessage: null, errorOpen: false});
        try {
            const response = await axios.post<User>("http://localhost:4000/login", { username: this.state.username, password: this.state.password });
            console.log(response.data.id);
            localStorage["loginData"] = JSON.stringify(response.data);
            console.log(localStorage["loginData"]);
            if (response.data.role == "User") {
                this.props.history.push({ pathname: "/user", state: { userId: response.data.id , userName: response.data.username} });
            }
            if (response.data.role == "Admin") {
                this.props.history.push("/admin");
            }
        }
        catch (error) {  
            this.setState({ errorMessage: notify.error(error), errorOpen: true });
        }
    }

    signUp = () => {
        this.props.history.push("/signUp");
    } 

    public render(): JSX.Element {
        return (
            <div className="loginPage">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleUsernameChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handlePasswordChange}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={this.login}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="http://localhost:3000/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link> 
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Dialog
                    open={this.state.errorOpen}
                    aria-labelledby="modal-modal-title"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <h4>{this.state.errorMessage}</h4>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions> 
                        <Button onClick={() => { this.setState({ errorOpen: false, errorMessage: null }) }}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default LoginPage;
