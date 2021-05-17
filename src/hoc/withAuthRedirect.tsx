import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../redux/redux-store';

type MapStatePropsType = {
    isAuthenticated: boolean
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export const withAuthRedirect = <Prop extends object>(Component: React.ComponentType<Prop>) => {
    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
        let {isAuthenticated, ...restProps} = props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return <Component {...restProps as Prop} />;
    };
    

    let ConnectedRedirectComponent = connect<MapStatePropsType, undefined, {}, RootState>(mapStateToProps)(RedirectComponent);

    return ConnectedRedirectComponent;
}
