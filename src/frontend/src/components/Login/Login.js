import React from 'react'

const Login = (props) => {
    return(
        <button onClick={props.auth.login}>Log in</button>
    )
}

export default Login
