import axios from "axios";
import { Component, SyntheticEvent } from "react";
import { History } from "history";
import notify from "../../../Services/Notify";
//---------------------------
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
//---------------------------
import "./signupPage.css";


interface SignupPageState {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  errorMessage: string | null,
  errorOpen: boolean,
}

interface SignupPageProps {
  history: History;
}


class SignupPage extends Component<SignupPageProps, SignupPageState>{
  constructor(props: SignupPageProps) {
    super(props);
    this.state = { firstname: "", lastname: "", username: "", password: "", errorMessage: null, errorOpen: false };
  }
  handleFirstnameChange = (e: SyntheticEvent) => {
    const firstname = (e.target as HTMLInputElement).value;
    this.setState({ firstname: firstname });
  }
  handleLastnameChange = (e: SyntheticEvent) => {
    const lastname = (e.target as HTMLInputElement).value;
    this.setState({ lastname: lastname });
  }
  handleUsernameChange = (e: SyntheticEvent) => {
    const username = (e.target as HTMLInputElement).value;
    this.setState({ username: username });
  }
  handlePasswordChange = (e: SyntheticEvent) => {
    const password = (e.target as HTMLInputElement).value;
    this.setState({ password: password });
  }

  signup = async () => {
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password
      });
      this.props.history.push("/login")
    }
    catch (error) {
      this.setState({ errorMessage: notify.error(error), errorOpen: true });
    }
  }

  public render(): JSX.Element {
    return (
      <div className="signupPage">

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
              Sign up
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={this.handleFirstnameChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={this.handleLastnameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={this.handleUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={this.handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.signup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="http://localhost:3000/login" variant="body2">
                    Already have an account? Sign in
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

export default SignupPage;
