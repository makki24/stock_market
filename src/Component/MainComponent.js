import React, {Component} from "react";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {Switch, withRouter,Route,Redirect} from "react-router-dom"
import {
    buyShare, createAccount, fetchAccount,
    fetchObjects,
    loginUser,
    logoutUser, sellShare
} from "../redux/ActionCreators";
import Account from "./AccountComponent";
import TransactionComponent from "./TransactionComponent";
import StockComponent from "./StockComponent";
import Shares from "./Shares";
import HomeComponent from "./HomeComponent";
import CreateAccount from "./CreateAccount";


const mapStatetoProps = (state) =>
{
    return{
        auth:state.auth,
        account:state.account,
        corporation:state.corporation,
        shares:state.shares,
        myShares:state.myShares,
        sale:state.sale,
        accountCreation:state.accountCreation
    }
}

const mapDispatchToProps =(dispatch) =>(
{
    loginUser : (creds) =>dispatch(loginUser(creds)),
    logoutUser: () =>dispatch(logoutUser()),
    fetchObjects:() =>dispatch(fetchObjects()),
    buyShare:(data) =>dispatch(buyShare(data)),
    fetchAccount:()=>dispatch(fetchAccount()),
    sellShare:(data) =>dispatch(sellShare(data)),
    createAccount:(data) =>dispatch(createAccount(data))
});


class MainComponent extends Component
{
    componentDidMount()
    {
        this.props.fetchObjects();
        if(this.props.auth.isAuthenticated)
        {
            this.props.fetchAccount();
        }
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
            (
            <Account  account={this.props.account} auth={this.props.auth} sellShare={this.props.sellShare} sale={this.props.sale}/>
            );
        const Historypage =() =>
        {
            return(
                <TransactionComponent account={this.props.account} />
            )
        }
        const Stockpage=() =>
        {
            console.log('Stock page called');
            return(
                <StockComponent corporation={this.props.corporation}/>
            )
        }
        const Sharepage=(props) =>
        {
            console.log("share page called");
            const match=props.match;
            return(
                 <Shares shares={this.props.shares.shares.filter((share) => share.corpId ===match.params.corpID)}
              isLoading={this.props.shares.isLoading}
              errMess={this.props.shares.err}
              auth={this.props.auth}
              buyShare={this.props.buyShare}
              myShares={this.props.myShares}   />
            );
        }

        const HomePage =() =>
            (
                <HomeComponent />
            )
        return(
            <div>
                <Header loginUser = { this.props.loginUser} logoutUser ={this.props.logoutUser} auth={this.props.auth}/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <PrivateRoute exact path={'/user'} component={Accountpage}/>
                    <Route exact path={'/createAccount'} component={()=><CreateAccount createAccount={this.props.createAccount}
                     accountCreation={this.props.accountCreation}/>} />
                    <Route exact path={'/user/history'} component={Historypage} />
                    <Route exact path={'/stock'}  component={Stockpage} />
                    <Route path={'/stock/:corpID'} component={Sharepage} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(MainComponent));