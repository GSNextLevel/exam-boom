import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {(props) => {
                let token = localStorage.getItem('userToken')
                !token && alert('로그인이 필요합니다.');
                return token?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/login', 
                                    state: {from: props.location}
                                  }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute;