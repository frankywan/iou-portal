import Config from '../constants/Config'
import DataRetriever from './DataRetriever'

class StuffOwedToMeRetriever extends DataRetriever{

    fetch = async () => {
        let ans = await this.fetchJSON(
            Config.api.stuffOwedToMeUri,
            JSON.stringify({view:'CREDITOR'}),
            'application/json'
        )

        return ans
    }
}

export default StuffOwedToMeRetriever