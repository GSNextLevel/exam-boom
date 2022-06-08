import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import GoogleAnalytics from '../utils/GoogleAnalytics';

function GARoute ({ component: Component, ...rest }) {

    GoogleAnalytics();

    return (
        <Route
            {...rest}
            render = {(props) => {
                return <Component {...props} />
            }

            }
                
        />
        
    )
}

export default GARoute;