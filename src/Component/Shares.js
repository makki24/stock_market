import React,{Component} from "react";
import {Loading} from "./LoadingComponent";
import {Table} from "reactstrap";

function RenderShares({shares})
{
    const share =shares.map((share,index) =>
    {
        return(
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{share.shareName}</td>
            <td>{share.shareValue}</td>
            <td>{share.marketId}</td>
            <td>{share.corpId}</td>
            <td>{share.soldOut}</td>
        </tr>)
    })
    return(
        <Table hover className={'mt-4'}>
        <thead className={'bg-info'}>
            <tr>
              <th>#</th>
              <th>Share</th>
              <th>Share Value</th>
              <th>marketID </th>
              <th>corpId</th>
              <th>Sold out</th>
            </tr>
        </thead>
        <tbody className={'text-align-center'}>
            {share}
        </tbody>
        </Table>
    )
}
class Shares extends Component
{
    render()
    {
        if(this.props.isLoading)
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <Loading />
                    </div>
                </div>
            )
        else if(this.props.err)
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        {this.props.err}
                    </div>
                </div>
            );
        else
        {
            return (
                    <div className={'container'}>
                        <RenderShares shares={this.props.shares}/>
                    </div>
            )
        }
    }
}
export default Shares;