import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateUserStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status ) {
            this.setState({
                status: this.props.status
            })
        }
    };

    render() {
        return (
            <div>
                {this.state.editMode ? (
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onMouseLeave={this.deactivateEditMode} type="text" value={this.state.status} />
                    </div>
                ) : (
                    <div>
                        <span onClick={this.activateEditMode}>{this.props.status ? this.props.status : "changeStatus"}</span>
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;
