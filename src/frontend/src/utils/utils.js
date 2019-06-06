import axios from "axios/index";
import { logOut, errorPopupShow } from "../actions/userCreators";

export const callApi = (method, url, data, config) => {
    let headers = null
    if (window.localStorage.getItem('iTripper_access_token')){
        const refreshTokenExpires = Date.parse(localStorage.getItem('iTripper_refresh_token_expires'))
        const accessTokenExpires = Date.parse(localStorage.getItem('iTripper_access_token_expires'))
        if (refreshTokenExpires && (Date.now() > refreshTokenExpires)){
            logOut();
        } else if (Date.now() >= accessTokenExpires){
            const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token');
            axios({
                method: 'post',
                url: 'api/usertokens',
                data: { userTokenRefresh }
            })
                .then(response => {
                    if (response.data) {
                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                        headers = {
                            Authorization: `Bearer ${response.data.userTokenAccess}`,
                        }
                        headers = Object.assign({ Authorization: `Bearer ${response.data.userTokenAccess}` }, config)
                        return axiosRequest(method, url, data, headers, config)
                    } else {
                        logOut()
                    }
                })
        }
        headers = {
            Authorization: `Bearer ${window.localStorage.getItem('iTripper_access_token')}`,
        }
        headers = Object.assign({ Authorization: `Bearer ${localStorage.getItem('iTripper_access_token')}` }, config)
    }
    return axiosRequest(method, url, data, headers, config)
}
//* *********************

export const axiosRequest = (method, url, data, headers, config) => {
    return axios({
        method,
        url,
        data,
        headers,
        cancelToken: config,
    })
}
//* *********************

export const setLocalStorage = (accessToken, refreshToken) => {
    const accessTokenExpires = new Date(Date.now() + 880000).toISOString()
    const refreshTokenExpires = new Date(Date.now() + 2591900000).toISOString()
    localStorage.setItem('iTripper_access_token', accessToken)
    localStorage.setItem('iTripper_refresh_token', refreshToken)
    localStorage.setItem('iTripper_access_token_expires', accessTokenExpires)
    localStorage.setItem('iTripper_refresh_token_expires', refreshTokenExpires)
    setTimeout(async () => {
        let response
        const data = {userTokenRefresh: refreshToken}
        try {
            response = await axios.post('/api/usertokens', data)
            if (response.data) {
                setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
            }
        } catch (err) {
            console.log(err)
        }
    }, 880000)
}

//* *********************
export const removeTokens = () => {
    localStorage.removeItem('iTripper_access_token')
    localStorage.removeItem('iTripper_access_token_expires')
    localStorage.removeItem('iTripper_refresh_token')
    localStorage.removeItem('iTripper_refresh_token_expires')
    localStorage.removeItem('iTripper_page')
    localStorage.removeItem('tripId')
}

//* *********************
const memo = Object.create(null);

const search = () => {
    let source;
    return (method, url, data) => {
        if(source){
            source.cancel('canceled by user')
        }
        source = axios.CancelToken.source();
        try{
            if (memo[data.pointSearchText]){
                return memo[data.pointSearchText]
            }
            const response = callApi(method, url, data, source.token)
            response
                .then(res => memo[data.pointSearchText] = res)
                .catch(console.log)
            return response
        } catch(error) {
            if(axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.log("Something's gone wrong: ", error.message)
            }
        }
    }
}

export const singleCallApi = search()
// * *********************

export const sendJoinTripRequest = (joinTrip) => {
    callApi('post', 'api/trips/passengers', joinTrip)
        .catch(err => errorPopupShow())
}
