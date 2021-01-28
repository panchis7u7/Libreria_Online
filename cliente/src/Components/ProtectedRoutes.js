import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let state = localStorage["appState"];
let AppState = JSON.parse(state);

const Auth = {
    isLoggedIn: AppState.isLoggedIn,
    user: AppState
};

export default function ProtectedRoute({component: Component , ...rest}) {
    return (
        <Route 
            {...rest}
            render={props => {
                if (Auth.isLoggedIn) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={{
                            pathname: "/",
                            state: {
                            from: props.location
                        }}}
                    />
                }
            }}
        />
    );
}