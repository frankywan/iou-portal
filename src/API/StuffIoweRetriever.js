import Config from '../constants/Config'
import DataRetriever from './DataRetriever'

export default class StuffIoweRetriever extends DataRetriever{

    fetch = async () => {
        let ans = await this.fetchJSON(
                Config.api.stuffIoweUri,
                JSON.stringify({view:'DEBTOR'}),
                'application/json'
        )

        return ans
    }
}
