import React, {Component} from "react";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {Switch, withRouter,Route} from "react-router-dom"
import { loginUser, logoutUser} from "../redux/ActionCreators";
import Account from "./AccountComponent";
import TransactionComponent from "./TransactionComponent";

const mapStatetoProps = (state) =>
{
    return{
        auth:state.auth,
        account:state.account
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
        const Accountpage =() =>
        {
            return(
            <Account  account={this.props.account} />
            );
        }
        const Historypage =() =>
        {
            return(
                <TransactionComponent account={this.props.account} />
            )
        }
        return(
            <div>
                <Header loginUser = { this.props.loginUser} logoutUser ={this.props.logoutUser} auth={this.props.auth}/>
                <Switch>
                    <Route path={'/user'} component={Accountpage}/>
                    <Route path={'/history'} component={Historypage} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(MainComponent));