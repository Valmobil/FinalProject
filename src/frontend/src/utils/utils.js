import axios from "axios/index";
import { logOut } from "../actions/userCreators";

export const callApi = (method, url, data, config) => {
    let headers = null
    if (window.localStorage.getItem('iTripper_access_token')){
        const refreshTokenExpires = Date.parse(window.localStorage.getItem('iTripper_refresh_token_expires'))
        const accessTokenExpires = Date.parse(window.localStorage.getItem('iTripper_access_token_expires'))
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
        headers = Object.assign({ Authorization: `Bearer ${window.localStorage.getItem('iTripper_access_token')}` }, config)
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
        config,
    })
}
//* *********************

export const setLocalStorage = (accessToken, refreshToken) => {
    const accessTokenExpires = new Date(Date.now() + 880000).toISOString()
    const refreshTokenExpires = new Date(Date.now() + 2591900000).toISOString()
    window.localStorage.setItem('iTripper_access_token', accessToken)
    window.localStorage.setItem('iTripper_refresh_token', refreshToken)
    window.localStorage.setItem('iTripper_access_token_expires', accessTokenExpires)
    window.localStorage.setItem('iTripper_refresh_token_expires', refreshTokenExpires)
}
//* *********************

export const removeTokens = () => {
    window.localStorage.removeItem('iTripper_access_token')
    window.localStorage.removeItem('iTripper_access_token_expires')
    window.localStorage.removeItem('iTripper_refresh_token')
    window.localStorage.removeItem('iTripper_refresh_token_expires')
}
