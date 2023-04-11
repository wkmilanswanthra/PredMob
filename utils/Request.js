import axios from "axios";

exports.sendRequest = async (method, body, url) => {
    return axios({
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: body,
    });

}