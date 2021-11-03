import moment from "moment";
import { Component, SyntheticEvent } from "react";
import jwtAxios from "../../../Services/JwtAxios";
import { History } from "history";
import notify from "../../../Services/Notify";
//------------------------
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
//------------------------
import "./addVacation.css";




interface AddVacationState {
    description: string;
    destination: string;
    image: any;
    start_date: Date | null | string;
    end_date: Date | null | string;
    price: number;
    errorMessage: string | null;
    errorOpen: boolean;
}

interface AddVacationProps {
    history: History;
}


class AddVacation extends Component<AddVacationProps, AddVacationState>{
    constructor(props: AddVacationProps) {
        super(props);
        this.state = { description: "", destination: "", image: null, start_date: moment(new Date()).format("YYYY-MM-DD"), end_date: moment(new Date()).format("YYYY-MM-DD"), price: 0, errorMessage: null, errorOpen: false };
    }

    handleDescriptionChange = (e: SyntheticEvent) => {
        const description = (e.target as HTMLInputElement).value;
        this.setState({ description: description });
    }

    handleDestinationChange = (e: SyntheticEvent) => {
        const destination = (e.target as HTMLInputElement).value;
        this.setState({ destination: destination });
    }

    handleStartdateChange = (date: any) => {
        const startdate = moment(new Date(date)).format("YYYY-MM-DD");
        this.setState({ start_date: startdate });
    }

    handleEnddateChange = (date: any) => {
        const enddate = moment(new Date(date)).format("YYYY-MM-DD");
        this.setState({ end_date: enddate });
    }

    handlePriceChange = (e: SyntheticEvent) => {
        const price = +((e.target as HTMLInputElement)).value;
        this.setState({ price: price });
    }

    handleImageChange = (e: SyntheticEvent) => {
        const image = (e.target as HTMLInputElement).files;
        this.setState({ image: image });
    }

    addVacation = async () => {
        const myFormData = new FormData();
        try {
            myFormData.set("id", `0`);
            myFormData.append("description", this.state.description);
            myFormData.append("destination", this.state.destination);
            myFormData.append("image", this.state.image[0]);
            myFormData.set("start_date", `${this.state.start_date}`);
            myFormData.set("end_date", `${this.state.end_date}`);
            myFormData.set("price", `${this.state.price}`);
            const response = await jwtAxios.post("http://localhost:4000/admin/addVacation", myFormData);
        }
        catch (error) {
            this.setState({ errorMessage: notify.error(error), errorOpen: true });
        }
    }


    public render(): JSX.Element {
        return (
            <div className="addVacation">
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
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add a New Vacation
                        </Typography>
                        <Box component="form" sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="description"
                                        name="description"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        autoFocus
                                        onChange={this.handleDescriptionChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="destination"
                                        label="Destination"
                                        name="destination"
                                        autoComplete="destination"
                                        onChange={this.handleDestinationChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Start Date"
                                            value={this.state.start_date}
                                            onChange={(newValue) => {
                                                //const newDate = new Date(newVal);
                                                this.handleStartdateChange(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="End Date"
                                            value={this.state.end_date}
                                            onChange={(newValue) => {
                                                //const newDate = new Date(newValue);
                                                this.handleEnddateChange(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="price"
                                        label="price"
                                        name="price"
                                        autoComplete="Price"
                                        onChange={this.handlePriceChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        required
                                        accept="/*"
                                        id="raised-button-file"
                                        type="file"
                                        onChange={this.handleImageChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={this.addVacation}
                            >
                                ADD
                            </Button>
                        </Box>
                    </Box>
                </Container>
                <Dialog
                    open={this.state.errorOpen}
                    aria-labelledby="modal-modal-title">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.errorMessage == "Cannot read properties of null (reading '0')"? <h4>Please upload an image</h4> : 
                            <h4>{this.state.errorMessage}</h4>}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            if (this.state.errorMessage == "Your login session has expired.") {
                                this.props.history.push("/login");
                            }
                            else {
                                this.setState({ errorOpen: false, errorMessage: null });
                            }
                        }}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default AddVacation;
