
import { Component, SyntheticEvent } from "react";
import Vacation from "../../../Models/VacationModel";
import moment from "moment";
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
//------------------------
import "./editVacation.css";


interface EditVacationState {
    description: string;
    destination: string;
    image: any;
    start_date: Date | string;
    end_date: Date | string;
    price: number;
    errorMessage: string | null;
    errorOpen: boolean;
}

interface EditVacationProps{
    vacation: Vacation | undefined;
    history: History;
}

class EditVacation extends Component<EditVacationProps, EditVacationState>{

    constructor(props: EditVacationProps) {
        super(props);
        if (this.props.vacation != undefined) {
            this.state = { description: this.props.vacation.description, destination: this.props.vacation.destination, image: this.props.vacation.image, start_date: moment(new Date(this.props.vacation.start_date)).format("YYYY-MM-DD"), end_date: moment(new Date(this.props.vacation.end_date)).format("YYYY-MM-DD"), price: Number(this.props.vacation.price), errorMessage: null, errorOpen: false };
        }
    }


    handleDescriptionChange = (e: SyntheticEvent) => {
        const description = (e.target as HTMLInputElement).value;
        this.setState({ description: description });
    }

    handleDestinationChange = (e: SyntheticEvent) => {
        const destination = (e.target as HTMLInputElement).value;
        this.setState({ destination: destination });
    }

    handleStartdateChange = (date:any) => {
        const startdate = moment(new Date(date)).format("YYYY-MM-DD");
        this.setState({ start_date: startdate });
    }

    handleEnddateChange = (date:any) => {
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

    editVacation = async () => {
        const myFormData = new FormData();
        myFormData.set("id", `${this.props.vacation?.id}`);
        myFormData.append("description", this.state.description);
        myFormData.append("destination", this.state.destination);
        myFormData.set("start_date", `${this.state.start_date}`);
        myFormData.set("end_date", `${this.state.end_date}`);
        myFormData.set("price", `${this.state.price}`);
        if (this.state.image[0].name) {
            //console.log("in here - new image");
            myFormData.append("image", this.state.image[0]);
        }
        try {
            //console.log(myFormData);
            const response = await jwtAxios.put("http://localhost:4000/admin/editVacation", myFormData);
        }
        catch (error) {
            this.setState({ errorMessage: notify.error(error) , errorOpen: true});
        }
    }



    public render(): JSX.Element {
        return (
            <div className="editVacation">
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
                            <EditOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Vacation
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
                                        value={this.state.description}
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
                                        value={this.state.destination}
                                        onChange={this.handleDestinationChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Start Date"
                                            value={this.state.start_date}
                                            onChange={(newValue) => {
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
                                        value={this.state.price}
                                        onChange={this.handlePriceChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={`http://localhost:4000/images/${this.state.image}`} width="100%" height="95%"></img>
                                    <input
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
                                onClick={this.editVacation}
                            >
                                EDIT
                            </Button>
                        </Box>
                    </Box>
                </Container>
                <Dialog 
                open={this.state.errorOpen}
                aria-labelledby="modal-modal-title">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <h4>{this.state.errorMessage}</h4>
                            <h4>From Edit</h4>
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

export default EditVacation;
