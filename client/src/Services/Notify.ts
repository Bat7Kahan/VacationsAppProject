// Notifications

import { Notyf } from "notyf";

class Notify {
    public success(message: string): string {;
        return message;
    }

    public error(err: any): string {
        const message = this.getErrorMessage(err);
        return message;
    }

    private getErrorMessage(err: any): string {

        // Frontend exception throwing a string, e.g: throw "...":
        if (typeof err === "string") {
            return err;
        }

        // Axios receives a string error, e.g: 401, 403, 404, 500:
        if (typeof err.response?.data === "string") {
            return err.response.data;
        }

        // Axios receives an array of errors, e.g: 400:
        if (Array.isArray(err.response?.data)) {
            let allErrors = "";
            for (const item of err.response.data) {
                allErrors += item + `\n`;
            }
            return allErrors; 
        }

        // Frontend exception throwing one of the Error types, e.g: throw new Error("..."), throw new RangeError("...") etc.
        // Note: must be last cause previous one also can also contain a message:
        if (typeof err.message === "string") {
            return err.message;
        }

        // Any other error format: 
        return "Some error occurred, please try again.";
    }
}

const notify = new Notify();

export default notify;