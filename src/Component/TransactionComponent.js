import React from "react";
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {Loading} from "./LoadingComponent";

const TransactionComponent =(props) =>
{
    const history=props.account.history.map((stock,index) =>
    {
        return(
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{stock.shareName}</td>
                  <td>{stock.priceBoughtAt} $</td>
                  <td>{stock.priceSoldAt?stock.priceSoldAt+' $':null}</td>
                  <td>{new Date(stock.timeBoughtAt).toLocaleDateString()+" "+new Date(stock.timeBoughtAt).toLocaleTimeString()}</td>
                  <td>{stock.timeSoldAt?new Date(stock.timeSoldAt).toLocaleDateString()+" "+new Date(stock.timeSoldAt).toLocaleTimeString():null}</td>
                </tr>
            )

    })
    if(props.account.historyLoading)
    {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.account.errHistory)
    {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    {props.account.errHistory}
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className={'container'}>
                <div className={'row mt-3'}>
                    <Card>
                        <CardHeader className={'bg-primary text-white'}>My Transactions</CardHeader>
                        <CardBody>
                            <Table hover>
                                <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Share</th>
                                      <th>Price Bought At</th>
                                      <th>Price Sold At</th>
                                      <th>Time Bought At</th>
                                      <th>Time Sold At</th>

                                    </tr>
                                </thead>
                                <tbody className={'text-align-center'}>
                                    {history}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default TransactionComponent;