import React, {Component} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input, Modal
} from "reactstrap";
import {Loading} from "./LoadingComponent";
import {Link} from "react-router-dom";


class Account extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            isModOpen:false
        };
        this.toggleMod=this.toggleMod.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleMod()
    {
        this.setState(
            {
                isModOpen: !this.state.isModOpen
            }
        )
    }
    handleSubmit(event)
    {
        event.preventDefault();
        this.toggleMod();
        this.props.addMoney({amount:this.amount.value})
    }
    render()
    {
            const Holds = () =>
            {
                if (this.props.account.isLoading)
                    return (
                        <div className={'container'}>
                            <div className={'row'}>
                                <Loading/>
                            </div>
                        </div>
                    );
                else if (this.props.account.errHolds)
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
                        <Table hover className={''}>
                            <thead className={''}>
                            <tr>
                                <th>#</th>
                                <th>Share</th>
                                <th className={'d-none d-md-block'}>Price Bought At</th>
                                <th>Current Value</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className={'text-align-center'}>
                            {stocks}
                            </tbody>
                        </Table>
                    )
                }
            }
            const stocks = this.props.account.holds.success!==false ? this.props.account.holds.map((stock, index) =>
            {
                var obj={shareId:stock.shareId};
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{stock.shareId}</td>
                        <td className={'d-none d-md-block'}>{stock.priceBoughtAt} $</td>
                        <td>{stock.shareValue} $</td>
                        <td>{this.props.sale.isLoading?<Loading />:<Button color={'success'} className={'btn-block'} onClick={() =>{
                            console.log(obj);
                            this.props.sellShare(obj)}}>Sell</Button> }</td>
                    </tr>
                )
            }):'Please logout and login';
            const Acc = () =>
            {
                console.log(this.props.account);
                if (this.props.account.detailLoading === true)
                    return (
                        <Loading/>
                    );
                else if (this.props.account.errorDetail !== null)
                    return (
                        <div>
                            {this.props.account.errorDetail}
                        </div>
                    );
                else if (this.props.account.details)
                {
                    console.log("here");
                    return (
                        <div>
                            {this.props.account.details.accountBalance} $
                        </div>
                    );
                }
                else
                {
                    return (
                        <div>

                        </div>
                    )
                }
            }
            return (
                <div className={"container"}>
                    <div className={"row mt-2"}>
                        <div className={"col-12 col-md-6"}>
                            <Card>
                                <CardHeader className={'bg-primary text-white'}>My stocks</CardHeader>
                                <CardBody>
                                    <Holds/>
                                </CardBody>
                            </Card>
                        </div>
                        <div className={"col-md-1"}>
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
                                            <Acc/>
                                        </div>
                                    </div>
                                    <div className={'row mt-2'}>
                                        <div className={'col-6'}>
                                            <Link to={'/user/history'}>Share Transactions</Link>
                                        </div>
                                    </div>
                                    <div className={'row mt-2'}>
                                        <div className={'col-6'}>
                                            <Button className={'bg-info'} onClick={this.toggleMod}><span className={'fa fa-money fa-lg'}></span> Add money
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModOpen} toggle={this.toggleMod}>
                       <ModalHeader toggle={this.toggleMod}>
                        Add money
                       </ModalHeader>
                       <ModalBody>
                           <Form onSubmit={this.handleSubmit}>
                               <FormGroup>
                                   <Label htmlFor={'Amount'}> Amount(In local currency)</Label>
                                   <Input id={'Amount'} type={'number'} name={'Amount'} innerRef={(input)=>
                                   this.amount=input} />
                               </FormGroup>
                               <Button type={'submit'} color={'primary'} role={'button'}>Submit</Button>
                           </Form>
                       </ModalBody>
                    </Modal>
                </div>
            );
    }
}

export default Account;