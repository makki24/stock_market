import React,{Component} from "react";
import {Loading} from "./LoadingComponent";
import {Breadcrumb, BreadcrumbItem, Table,Button} from "reactstrap";
import {Link} from "react-router-dom";

function RenderShares({shares,auth,buyShare,myShares})
{
    var solout=0;
    const share =shares.map((share,index) =>
    {
        var obj=new Object();
        obj.shareId=share.shareId;
        if(share.soldOut===0)
        {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1-solout}</th>
                    <td>{share.shareName}</td>
                    <td>{share.shareValue}</td>
                    <td>{share.marketName}</td>
                    {
                        myShares.isLoading ?<Loading />:
                        auth.isAuthenticated ? <td><Button className={'btn-block'} color={'primary'} onClick={() =>
                        {
                            buyShare(obj)
                        }}>
                            Buy
                        </Button></td> : <td/>
                    }
                </tr>)
        }
        else
        {
            solout++;
        }
    })
    return(
        <Table hover className={'mt-4'}>
        <thead className={'bg-info'}>
            <tr>
              <th>#</th>
              <th>Share</th>
              <th>Share Value</th>
              <th>Market Name </th>
              <th></th>
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
                        <div className={'row'}>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem ><Link to='/stock'>Company</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.company.corpName}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <RenderShares shares={this.props.shares} auth={this.props.auth} buyShare={this.props.buyShare} myShares={this.props.myShares}/>
                    </div>
            )
        }
    }
}
export default Shares;