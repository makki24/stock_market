import React from "react";
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {Loading} from "./LoadingComponent";

const TransactionComponent =(props) =>
{
    const history=props.account.history.map((stock,index) =>
    {
        return(
                <tr key={index}>
                  <th scope="row"  className={'d-none d-md-block'}>{index+1}</th>
                  <td>{stock.shareName}</td>
                  <td>{stock.priceBoughtAt} $</td>
                  <td className={'d-none d-md-block'}>{stock.priceSoldAt?stock.priceSoldAt+' $':null}</td>
                  <td>{new Date(stock.timeBoughtAt).toLocaleDateString()+" "+new Date(stock.timeBoughtAt).toLocaleTimeString()}</td>
                  <td className={'d-none d-md-block'}>{stock.timeSoldAt?new Date(stock.timeSoldAt).toLocaleDateString()+" "+new Date(stock.timeSoldAt).toLocaleTimeString():null}</td>
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
                    <div className={'col-12'}>
                        <Card>
                            <CardHeader className={'bg-primary text-white'}>My Transactions</CardHeader>
                            <CardBody>
                                <Table  hover>
                                    <thead className={'bg-info'}>
                                        <tr>
                                          <th className={'d-none d-md-block'}>#</th>
                                          <th>Share</th>
                                          <th>Price Bought At</th>
                                          <th className={'d-none d-md-block'}>Price Sold At</th>
                                          <th>Time Bought At</th>
                                          <th className={'d-none d-md-block'}>Time Sold At</th>
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
            </div>
        );
    }
}

export default TransactionComponent;