import { Component } from "react";
import CanvasJSReact from "../../../canvasjs.react";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import {History} from "history";
import "./reports.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ReportsState{
    dataPoints: Array<{label:string, y:number}>;
    errorMessage: string|null;
    errorOpen: boolean;
}

interface ReportsProps{
    history: History;
}


class Reports extends Component <ReportsProps,ReportsState>{

    constructor(props:ReportsProps){
        super(props);
        this.state= {dataPoints:[], errorMessage: null, errorOpen: false};
    }

    componentDidMount = async () => { 
        try {
            const response = await jwtAxios.get<Array<{label:string, y:number}>>("http://localhost:4000/admin/getListForReports");
            this.setState({dataPoints: response.data});
            console.log(this.state.dataPoints);
            
        } catch (error) {
            this.setState({errorMessage: notify.error(error), errorOpen: true});
        }
    }

    public render(): JSX.Element {        
         const options = {
            data: [{				
                type: "column",
                dataPoints:this.state.dataPoints
            }]
         }
        
         //console.log(options);
         
        return (            
            <div className="reports">
                <CanvasJSChart options={options} className="report"
                
                />
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
                            if (this.state.errorMessage === "Your login session has expired.") {
                                console.log("in add error");
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

export default Reports;
