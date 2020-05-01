import GlobalData from '../utils/GlobalData'
import ErrorTracker from '../utils/ErrorTracker'

class IOUError extends Error {
    constructor(message, obj) {
        super(message);
        this.obj = obj;
    }
}

export default class DataRetriever {

    constructor() {
        this.noMessages = false
    }

    /**
        uri:
        body:
        postType: ['multipart/form-data'|'application/json'|...]
    **/
    fetchJSON = async (uri, postData, postType) => {
        try{
            let ans = await this._fetchJSON(uri, postData, postType)
            this.showMessage(ans)
            return ans
        }
        catch(error) {
            //console.log(this.constructor.name+".fetchJSON.catch.error.http")
            //console.log(error.http)
            if(error.http) {
                if(error.http.responseStatus !== 422)
                    this.showMessage(error.http)
            }
            ErrorTracker.add(error)
            throw error
        }
    }

    showMessage(ans) {
        if(this.noMessages)
            return
        //console.log(this.constructor.name+".showMessage.ans.answerBody:"+ans.answerBody)
        //console.log(this.constructor.name+".showMessage.ans.answerBody.statusMessages:"+ans.answerBody.statusMessages)
        //if(ans.answerBody && ans.answerBody.statusMessages)
        //    console.log(this.constructor.name+".showMessage.ans.answerBody.statusMessages.length:"+ans.answerBody.statusMessages.length)

        let json
        if(ans.answerBody && typeof(ans.answerBody) == 'string' ) {
            try {
                //console.log(this.constructor.name+".showMessage.ans.answerBody:"+typeof(ans.answerBody))
                json = JSON.parse(ans.answerBody)
            }
            catch(e){
                return
            }
        }
        else if (ans.answerBody)
            json = ans.answerBody
        else
            return

        if(json.statusMessages && json.statusMessages.length) {
            //console.log(this.constructor.name+".json.statusMessages:")
            //console.log(json.statusMessages)
            GlobalData.state.app.showMessage(json.statusMessages[0].message)
        }
    }

    _fetchJSON = async (uri, postData, postType) => {
        var reqID = ++GlobalData.state.reqID
        GlobalData.setState({reqID: reqID});

        var headers = new Headers();
        headers.append('Accept-encoding', 'gzip, deflate')
        headers.append('Accept', 'application/json')
        if(postType)
            headers.append('Content-Type', postType)
        if(GlobalData.state.userKey)
            headers.append('X-Auth-Token', GlobalData.state.userKey+":"+GlobalData.state.userSecret)
        if(GlobalData.state.dictionaryLocale)
            headers.append('X-IOU-Locale', GlobalData.state.dictionaryLocale)

        let options = {
            //mode: 'same-origin'
            //redirect: 'follow',
            headers: headers,
            method: postData?'POST':'GET',
            body: postData,
        }

        console.log(this.constructor.name+".fetch (reqID:"+reqID+") uri: "+uri+" options: "+JSON.stringify(options))

        let response
        let body = null
        let json
        let logString
        let answerBody
        try {
            response = await fetch(uri, options) // wait for the HTTP headers to arrive
            logString = this.constructor.name+".fetch(reqID:"+reqID+") response status="+response.status+", "+(response.statusText?response.statusText:"")+"\n"
            console.log(logString);

            body = await response.text() // wait for the whole data to arrive
            try{
                answerBody = json = JSON.parse(body);
            }
            catch(error) {
                answerBody = body
                throw error
            }
        }
        catch(error) {
            console.log(this.constructor.name+".fetch.error(reqID:"+reqID+") error: ("+error+") body: "+body);
            throw new IOUError("error", {
                exception: JSON.stringify(error),
                origin: this.constructor.name+".fetch",
                http:{
                    uri: uri,
                    request: JSON.stringify(options),
                    responseStatus:response.status,
                    answerBody: answerBody,
                }
            })
        }

        if(response.status !== 200)
        {
            console.log(this.constructor.name+".fetch(reqID:"+reqID+") response("+response.status+"): "+JSON.stringify(json)+"\n");
            throw new IOUError("error", {
                exception: null,
                origin: this.constructor.name+".fetch",//ErrorTracker.getStack(),
                http: {
                    uri: uri,
                    request: JSON.stringify(options),
                    responseStatus: response.status,
                    answerBody: answerBody,
                }
            })
        }
        else {
            //console.log("DataRetriever (reqID:"+reqID+"): returning object: ")
            //console.log(json)
            return({answerBody: json})
        }
    }

    fetch(uri, body, callback) {
    }
}



/*
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/\\+\\+[++^A-Za-z0-9+/=]/g, "");

        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}
*/