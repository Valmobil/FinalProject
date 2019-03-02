/*eslint no-restricted-globals: 0*/
import auth0 from 'auth0-js'
import jwtDecode from 'jwt-decode'


export default class Auth{
    auth0 = new auth0.WebAuth({
        domain: "messenger.eu.auth0.com",
        clientID: "K0BIoaicEbHVnXZDu3b4yFOO86SlUSsD",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://messenger.eu.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile"
    })

    constructor(){
        this.login = this.login.bind(this);
    }

    login(){
        this.auth0.authorize();
    }

    handleAuthentication(){
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken){
                let expiresAt = JSON.stringify(authResults.expiresIn)*1000 + new Date().getTime();
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                history.replaceState(null, null, ' ');
                location.pathname = '/';
            }
            else if (err) {
                location.pathname = '/';
                console.log(err);
            }
        })
    }

    isAthenticated(){
                let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
                return new Date().getTime() < expiresAt
    }

    logout(){
                localStorage.removeItem("access_token");
                localStorage.removeItem("id_token");
                localStorage.removeItem("expires_at");
                location.pathname = '/';
    }
    getProfile(){
                if (localStorage.getItem("id_token")){
                    return jwtDecode(localStorage.getItem("id_token"))
                }
                else return {}
    }
}