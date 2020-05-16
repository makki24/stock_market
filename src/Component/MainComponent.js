import React, {Component} from "react";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {Switch, withRouter,Route,Redirect} from "react-router-dom"
import {
    addMoney,
    buyShare, createAccount, fetchAccount, fetchMarket,
    fetchObjects, insertCorp, insertCountry, insertMarket,
    loginUser, logoutSuccess,
    logoutUser, sellShare, insertShare, updateShare
} from "../redux/ActionCreators";
import Account from "./AccountComponent";
import TransactionComponent from "./TransactionComponent";
import StockComponent from "./StockComponent";
import Shares from "./Shares";
import HomeComponent from "./HomeComponent";
import CreateAccount from "./CreateAccount";
import Contact from "./ContactUs";
import {actions} from "react-redux-form";
import Footer from "./FooterComponent";
import AdminComponent from "./AdminComponent";


const mapStatetoProps = (state) =>
{
    return{
        auth:state.auth,
        account:state.account,
        corporation:state.corporation,
        shares:state.shares,
        myShares:state.myShares,
        sale:state.sale,
        accountCreation:state.accountCreation,
        country:state.country,
        market:state.market
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
    createAccount:(data) =>dispatch(createAccount(data)),
    addMoney:(data) =>dispatch(addMoney(data)),
    logoutSuccess:() =>dispatch(logoutSuccess()),
    insertCorp:(data) =>dispatch(insertCorp(data)),
    insertCountry:(data) =>dispatch(insertCountry(data)),
    insertMarket:(data) =>dispatch(insertMarket(data)),
    fetchMarket:() => dispatch(fetchMarket()),
    insertShare:(data)=> dispatch(insertShare(data)),
    updateShare:(data) =>dispatch(updateShare(data)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});


class MainComponent extends Component
{
    componentDidMount()
    {
        this.props.fetchObjects();
        if(this.props.auth.isAuthenticated)
        {
            this.props.fetchAccount();
            if(this.props.auth.creds.username==='admin')
                this.props.fetchMarket();
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
        const PrivateRoute2 = ({ component: Component, ...rest }) => (
          <Route {...rest} render={(props) => (
              (this.props.auth.isAuthenticated?this.props.auth.creds.username==='admin':false)
              ? <Component {...props} />
              : <Redirect to={{
                  pathname: '/home',
                  state: { from: props.location }
                }} />
          )} />
        );
        const Accountpage =() =>
            (
            <Account  account={this.props.account} auth={this.props.auth} sellShare={this.props.sellShare}
                      sale={this.props.sale} addMoney={this.props.addMoney}/>
            );
        const Adminpage=() =>
            (
                <AdminComponent insertCorp={this.props.insertCorp} insertCountry={this.props.insertCountry}
                country={this.props.country} insertMarket={this.props.insertMarket} market={this.props.market}
                corporation={this.props.corporation} insertShare={this.props.insertShare} shares={this.props.shares}
                updateShare={this.props.updateShare}/>
            )
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
              company={this.props.corporation.company.filter((company) =>company.corpId===match.params.corpID)[0]}
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
                    <PrivateRoute2 exact path={'/admin'} component={Adminpage}/>
                    <Route exact path={'/createAccount'} component={()=><CreateAccount createAccount={this.props.createAccount}
                     accountCreation={this.props.accountCreation} country={this.props.country}/>} />
                     <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                            postFeedback={this.props.postFeedback} />} />
                    <Route exact path={'/user/history'} component={Historypage} />
                    <Route exact path={'/stock'}  component={Stockpage} />
                    <Route path={'/stock/:corpID'} component={Sharepage} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(MainComponent));