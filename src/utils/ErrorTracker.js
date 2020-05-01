
export default class ErrorTracker {

    static _global_errors = []
    static _err_no = 0

    static lastError

    static add = (error) => {
        ErrorTracker.lastError = error
        this._global_errors.push({
            no: ++this._err_no,
            time: Date.now(),
            ...error,
        })
    }

    static getAll = () => {
        return this._global_errors
    }

    static getStack() {
        /*var stack = new Error().stack
            caller = stack.split('\n')[2].trim();
        console.log(caller);*/
        //console.log("Error:");
        //console.log(new Error());
        //return new Error()
        let myObj = {}
        Error.captureStackTrace(myObj)
        return myObj
    }


}