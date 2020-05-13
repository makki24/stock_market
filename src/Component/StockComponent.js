import React, {Component} from "react";
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardHeader} from "reactstrap";
import {Link} from "react-router-dom";
import {baseUrl} from "../shared/baseUrl";
import {Loading} from "./LoadingComponent";

function RenderCompany({company})
{
    return(
        <Card className={'company-list'}>
            <Link to={`/stock/${company.corpId}`} style={{textDecoration:'none',color:'black'}}>
            <CardImg className={''} height={'160'} width={'250'}  src={baseUrl+company.image} alt={company.corpName} />
            <CardHeader style={{textAlign:'center',fontWeight:'bold',color:'white',background:'blue'}}>
                {company.corpName}
            </CardHeader>
            <CardBody style={{background:'#9999ff',color:'floralwhite'}}>
                <div className={'row'}>
                    <div className={'col-6 mr-2'}>
                        Since
                    </div>
                    <div className={'col'}>
                        {new Date(company.startDate).toLocaleDateString()}
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-6 mr-2'}>
                        {company.corpType}
                    </div>
                </div>
            </CardBody>
            </Link>
        </Card>
    );
}
class StockComponent extends Component
{
    render()
    {
        const company=this.props.corporation.company.map((company) =>
        {
            return(
                <div key={company.corpId} className={'col-md-4 mt-4'}>
                        <RenderCompany company={company}/>
                </div>
            )
        })
        if(this.props.corporation.isLoading===true)
        {
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(this.props.corporation.err!==null)
        {
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <h4>{this.props.corporation.err}</h4>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div className={'container'}>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Company</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Company</h3>
                            <hr />
                        </div>
                    </div>
                    <div className={'row mb-4'}>
                        {company}
                    </div>
                </div>
            );
        }
    }
}

export default StockComponent;