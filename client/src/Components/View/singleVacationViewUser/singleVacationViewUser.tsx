import { Component, Fragment, SyntheticEvent } from "react";
import moment from 'moment';
import Vacation from "../../../Models/VacationModel";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import { History } from "history";
//-----------------------------
import Card from '@mui/material/Card';
import { Grid } from "@material-ui/core";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
//-------------------------------
import "./singleVacationViewUser.css";


interface SingleVacationViewUserState {
    isFollowing: boolean;
    errorMessage: string | null;
    errorOpen: boolean;
}

interface SingleVacationViewUserProps {
    vacation: Vacation;
    userId: number;
    history: History;
}

class SingleVacationViewUser extends Component<SingleVacationViewUserProps, SingleVacationViewUserState>{

    constructor(props: SingleVacationViewUserProps) {
        super(props);
        this.state = { isFollowing: this.props.vacation.isFollowing, errorMessage: null, errorOpen: false };
    }

    handleFollow = async (e: SyntheticEvent) => {
        try {
            const response = await jwtAxios.post("http://localhost:4000/user/handleFollow", { user_id: this.props.userId, vacation_id: this.props.vacation.id });
            console.log(response);
            this.state.isFollowing ? this.setState({ isFollowing: false }) : this.setState({ isFollowing: true });
        }
        catch (error) {
            this.setState({ errorMessage: notify.error(error), errorOpen: true });
        }
    }


    public render(): JSX.Element {
        return (
            <Fragment>
                <Grid item>
                    <Card sx={{ maxWidth: '275px'}} style={{ display: 'inline-block', float:'right', width: '75vw' , minHeight: "100%", margin:"10px"}}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={`http://localhost:4000/images/${this.props.vacation.image}`}
                            alt="image"
                            className="imageSize"
                        />
                        <CardContent >
                            <Typography noWrap variant="h6" color="inherit" style={{padding:"3px", textOverflow:"ellipsis"}}>
                                {this.props.vacation.description}
                            </Typography> 
                            <Typography variant="body1" color="inherit" style={{padding:"4px"}}>
                                <LocationOnOutlinedIcon />
                                {this.props.vacation.destination}  
                            </Typography>
                            <Typography variant="body1" color="inherit"  style={{padding:"4px"}}>
                                <DateRangeOutlinedIcon />
                                {moment(this.props.vacation.start_date).format("YYYY-MM-DD")} TO {moment(this.props.vacation.end_date).format("YYYY-MM-DD")}
                            </Typography>
                            <Typography variant="body1" color="inherit"  style={{padding:"4px"}}>
                                <LocalOfferOutlinedIcon />
                                {this.props.vacation.price}$
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div style={{ display: 'flex'}}> 
                                {this.state.isFollowing ? <Button variant="contained" onClick={this.handleFollow}>unFollow</Button> : <Button onClick={this.handleFollow} >Follow</Button>}
                                    <Badge color="primary" badgeContent={this.props.vacation.followers} style={{ display: 'inline-block'}}>
                                        <FavoriteIcon />
                                    </Badge>
                            </div> 
                        </CardActions>        
                    </Card>
                </Grid>
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
                            if (this.state.errorMessage == "Your login session has expired") {
                                this.props.history.push("/login");
                            }
                            else {
                                this.setState({ errorOpen: false, errorMessage: null });
                            }
                        }}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default SingleVacationViewUser;
