

const auth = () => {
    const accessToken = window.localStorage.getItem('iTripper_access_token')
    const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
    if (Date.now() > Date.parse(accessTokenExpires)){
        console.log('token expired')
        window.localStorage.removeItem('iTripper_access_token')
        window.localStorage.removeItem('iTripper_access_token_expires')
        window.location.replace('/login');
    }

    console.log('auth token = ', accessToken)
}

export default auth