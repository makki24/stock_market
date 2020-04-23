import React, {Component} from "react";
import {Card, CardHeader, CardBody, Table} from "reactstrap";
import {Loading} from "./LoadingComponent";
import {Link} from "react-router-dom";


class Account extends Component
{
    render()
    {
        const Holds =() =>
        {
            if(this.props.account.isLoading)
                return(
                        <div className={'container'}>
                            <div className={'row'}>
                                <Loading />
                            </div>
                        </div>
                );
            else if(this.props.account.errHolds)
                return (
                    <div className={'container'}>
                            <div className={'row'}>
                                <h4>{this.props.account.errHolds}</h4>
                            </div>
                     </div>
                );
            else
            {
                return (
                    <Table hover>
                        <thead>
                            <tr>
                              <th>#</th>
                              <th>Share</th>
                              <th>Price Bought At</th>
                            </tr>
                        </thead>
                        <tbody className={'text-align-center'}>
                            {stocks}
                        </tbody>
                    </Table>
                )
            }
        }
        const stocks =this.props.account.holds.map((stock,index) =>
        {
            return(
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{stock.shareId}</td>
                  <td>{stock.priceBoughtAt}$</td>
                </tr>
            )
        })
        return(
            <div className={"container"}>
                <div className={"row mt-2"}>
                    <div className={"col-md-4"}>
                        <Card>
                            <CardHeader className={'bg-primary text-white'}>My stocks</CardHeader>
                            <CardBody>
                                <Holds />
                            </CardBody>
                        </Card>
                    </div>
                    <div className={"col-md-3"}>
                    </div>
                    <div className={"col-md-4"}>
                        <Card>
                            <CardHeader className={'bg-primary text-white'}> Account</CardHeader>
                            <CardBody>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        Account Balance
                                    </div>
                                    <div className={'col-6 '}>
                                        85$
                                    </div>
                                </div>
                                <div className={'row mt-2'}>
                                    <div className={'col-6'}>
                                        <Link to={'/history'} >Trasaction History</Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;