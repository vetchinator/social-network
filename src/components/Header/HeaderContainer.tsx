import React from "react";
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { RootState } from "../../redux/redux-store";

type MapStateToPropsType = {
    login: string | null,
    isAuthenticated: boolean
}

type MapDispatchToPropsType ={
    logout: () => void
}

type OwnPropsType = {}

type PropType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropType> {

    render() {
        return (
            <Header login={this.props.login} isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} />
        )
    }
};

const mapStateToProps = (state: RootState) => {
    return {
       login: state.auth.login,
       isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(
    mapStateToProps, {logout})(HeaderContainer);
