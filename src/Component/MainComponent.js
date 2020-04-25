import React, {Component} from "react";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {Switch, withRouter,Route,Redirect} from "react-router-dom"
import {fetchObjects, loginUser, logoutUser} from "../redux/ActionCreators";
import Account from "./AccountComponent";
import TransactionComponent from "./TransactionComponent";
import StockComponent from "./StockComponent";

const mapStatetoProps = (state) =>
{
    return{
        auth:state.auth,
        account:state.account,
        corporation:state.corporation
    }
}

const mapDispatchToProps =(dispatch) =>(
{
    loginUser : (creds) =>dispatch(loginUser(creds)),
    logoutUser: () =>dispatch(logoutUser()),
    fetchObjects:() =>dispatch(fetchObjects())
});


class MainComponent extends Component
{
    componentDidMount()
    {
        this.props.fetchObjects();
    }

    render()
    {
        const PrivateRoute = ({ component: Component, ...rest }) => (
          <Route {...rest} render={(props) => (
            this.props.auth.isAuthenticated
              ? <Component {...props} />
              : <Redirect to={{
                  pathname: '/home',
                  state: { from: props.location }
                }} />
          )} />
        );
        const Accountpage =() =>
        {
            return(
            <Account  account={this.props.account} auth={this.props.auth} />
            );
        }
        const Historypage =() =>
        {
            return(
                <TransactionComponent account={this.props.account} />
            )
        }
        const Stockpage=() =>
        {
            return(
                <StockComponent corporation={this.props.corporation}/>
            )
        }

        return(
            <div>
                <Header loginUser = { this.props.loginUser} logoutUser ={this.props.logoutUser} auth={this.props.auth}/>
                <Switch>
                    <PrivateRoute exact path={'/user'} component={Accountpage}/>
                    <Route exact path={'/history'} component={Historypage} />
                    <Route exact path={'/stock'} component={Stockpage} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(MainComponent));