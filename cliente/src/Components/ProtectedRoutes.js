import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({auth, component: Component , ...rest}) {
    return (
        <Route 
            {...rest}
            render={props => {
                if (true) {
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