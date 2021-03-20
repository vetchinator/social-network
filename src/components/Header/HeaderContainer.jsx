import React from "react";
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import * as axios from 'axios';

class HeaderContainer extends React.Component {

    componentDidMount() {
        
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then((response) => {
                if (response.data.resultCode === 0 ) {
                    let {id, login, email} = response.data.data;
                    this.props.setAuthUserData(id, login, email);
                }
            });
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
};

const mapStateToProps = (state) => {
    return {
       login: state.auth.login,
       isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
