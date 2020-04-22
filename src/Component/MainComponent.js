import React, {Component} from "react";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import {loginUser, logoutUser} from "../redux/ActionCreators";

const mapStatetoProps = (state) =>
{
    return{
        auth:state.auth
    }
}

const mapDispatchToProps =(dispatch) =>(
{
    loginUser : (creds) =>dispatch(loginUser(creds)),
    logoutUser: () =>dispatch(logoutUser())
});
class MainComponent extends Component
{
    render()
    {
        return(
            <div>
                <Header loginUser = { this.props.loginUser} logoutUser ={this.props.logoutUser} auth={this.props.auth}/>
            </div>
        )
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(MainComponent));