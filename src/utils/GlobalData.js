/** Usage
import GlobalData from './GlobalData'

// change the whole singleton GlobalData
GlobalData.state = { userId: "11231244", accessToken: "fa7sd87a8sdf7as" }

// change only a property
GlobalData.setState ({ userId: "1231234" })

// get a single property directly
console.log("User Id: ", GlobalData.state.userId)

// get a single property or more via object deconstruction
const { userId, property } = GlobalData.state
console.log("User Id: ", userId)
**/

export default class GlobalData {

    /**********************data singleton **************************/
    static instance = null;
    #_state = {};

    static get inst() {
        if (GlobalData.instance == null) {
            GlobalData.instance = new GlobalData();
        }
        return this.instance;
    }

    static get state() {
        return GlobalData.inst.#_state;
    }

    /*static set state(state) {
        GlobalData.inst.#_state = state;
    }*/

    static setState(state) {
        Object.entries(state).forEach((item, i) => {
            console.log("Globaldata.set: "+item[0]+": "+item[1])
            GlobalData.inst.#_state[item[0]] = item[1]
        })
    }

    static reset() {
        console.log("Globaldata.reset: {reqID: 0}")
        GlobalData.inst.#_state = {reqID: 0}
    }    
}