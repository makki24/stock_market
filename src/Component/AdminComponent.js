import React, {Component} from "react";
import {Form,Control,Errors} from "react-redux-form";
import {Button, Col, Label, Row} from "reactstrap";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const ranges =(val) => {return ((0 <= parseFloat(val)) && (parseFloat(val) <= 100));}



class CorpForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            file: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(values)
    {
        if(this.state.file && values.corpId && values.corpName)
        {
            const formData = new FormData();
            formData.append('imageFile', this.state.file);
            let obj={image:'images/'+this.state.file.name};
            obj={...obj,...values,formData};
            this.props.insertCorp(obj);
        }
        else if(!this.state.file)
            alert('Please select the file')
        else
            alert('CorpId and corp name are required')
    }

    onChange(e) {
        this.setState({file:e.target.files[0]});
    }
    render()
    {
        return(
            <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <h3>Insert Corporation</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <Form model={'corporationForm'} onSubmit={(values) => this.handleSubmit(values)}>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'corpId'} md={3}>Corporation Id</Label>
                                            <Col md={9}>
                                                <Control.text model=".corpId" id="corpId" name="corpId"
                                                              placeholder="Corporation Id"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".corpId"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'corpName'} md={4}>Corporation name</Label>
                                            <Col md={8}>
                                                <Control.text model=".corpName" id="corpName" name="corpName"
                                                              placeholder="Corporation Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".corpName"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-9'}>
                                        <Row className="form-group">
                                            <Label htmlFor="corpType" md={2}>Select Type</Label>
                                            <Col md={3}>
                                                <Control.select model={'.corpType'} name={'.corpType'}
                                                                className={'form-control'}>
                                                    <option>publicly held</option>
                                                    <option>closely held</option>
                                                    <option>limited liability</option>
                                                    <option>c corporation</option>
                                                    <option>s corporation</option>
                                                    <option>professional</option>
                                                    <option>non-profit</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <input type="file" name="myImage" onChange= {this.onChange} />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
            </div>
        )
    }
}

class CorpDeleteForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        let obj={...values};
        let corp = this.props.corporation.company.filter((item) => item.corpName === values.corpName)[0];
        if(corp)
        {
            obj.corpId=corp.corpId;
            this.props.deleteCorp(obj);
        }
        else
        {
            alert("Corporation doesn't exist");
        }
        //alert(JSON.stringify(values));

    }


    render()
    {
         const share=this.props.corporation.company.map((item) =>{
            return(
                <option>{item.corpName}</option>
            )
        });

        return (
            <div className={'container'}>
                <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Delete Corporation</h3>
                            <hr/>
                        </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Form model={'corpDeleteForm'} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="corpName" md={3}>Corporation Name</Label>
                                            <Col md={9}>
                                                <Control.select model={'.corpName'} name={'corpName'}
                                                         className={'form-control'} defaultValue={this.props.corp}>
                                                {share}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                </div>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 0}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class CountryForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        if(values.name && values.population && values.commision && values.currName && values.exchageValue && values.curId)
        this.props.insertCountry(values);
        else
        {
            alert("Country Name, population ,commission, currency name, exchange value, currency Id are required fields");
        }
        //alert(JSON.stringify(values));
    }
    render()
    {
        return(
            <div className={'container'}>
                    <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Insert Country</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <Form model={'countryForm'} onSubmit={(values) => this.handleSubmit(values)}>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'name'} md={3}>Country Name</Label>
                                            <Col md={9}>
                                                <Control.text model=".name" id="name" name="name"
                                                              placeholder="Country Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'population'} md={4}>Population</Label>
                                            <Col md={8}>
                                                <Control.text model=".population" id="population" name="population"
                                                              placeholder="Population"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  isNumber,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(15)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".population"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        isNumber: 'Must be a number',
                                                        minLength: 'Must be greater than 2 digits ',
                                                        maxLength: 'Must be 15 digits or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={"commision"} md={3}>commission</Label>
                                            <Col md={9}>
                                                <Control.text model=".commision" id="commision" name="commision"
                                                              placeholder="Commission"
                                                              className="form-control"
                                                              validators={{
                                                                  ranges,
                                                                  isNumber,
                                                                  maxLength: maxLength(12)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".commision"
                                                    show="touched"
                                                    messages={{
                                                        isNumber:"Must be a number",
                                                        ranges:"Values must be between 0 and 100",
                                                        maxLength: 'Must be 12 Characters or less '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'currName'} md={4}>Currency Name</Label>
                                            <Col md={8}>
                                                <Control.text model=".currName" id="currName" name="currName"
                                                              placeholder="Currency Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".currName"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={"exchageValue"} md={3}>Exchange Value</Label>
                                            <Col md={9}>
                                                <Control.text model=".exchageValue" id="exchageValue" name="exchageValue"
                                                              placeholder="Exchange value"
                                                              className="form-control"
                                                              validators={{
                                                                  isNumber,
                                                                  maxLength: maxLength(12)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".exchageValue"
                                                    show="touched"
                                                    messages={{
                                                        isNumber:"Must be a number",
                                                        ranges:"Values must be between 0 and 100",
                                                        maxLength: 'Must be 12 Characters or less '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'curId'} md={4}>Currency Id</Label>
                                            <Col md={8}>
                                                <Control.text model=".curId" id="curId" name="curId"
                                                              placeholder="Currency Id"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".curId"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
            </div>
        )
    }
}

class CountryDeleteForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        this.props.deleteCountry(values);
    }


    render()
    {
         const share=this.props.country.country.map((item) =>{
            return(
                <option>{item.name}</option>
            )
        });

        return (
            <div className={'container'}>
                <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Delete Country</h3>
                            <hr/>
                        </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Form model={'countryDeleteForm'} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="name" md={3}>Country Name</Label>
                                            <Col md={9}>
                                                <Control.select model={'.name'} name={'name'}
                                                         className={'form-control'} defaultValue={this.props.name}>
                                                {share}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                </div>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 0}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class MarketForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        if(values.marketName && values.workingDays && values.name && values.marketId)
        this.props.insertMarket(values);
        else
        {
            alert("Market Name, Working Days, Country and market Id are required fields");
        }
    }

    render()
    {
        const countr=this.props.country.country.map((item) =>{
            return(
                <option>{item.name}</option>
            )
        });

        return(
             <div className={'container'}>
                    <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Insert Market</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <Form model={'marketForm'} onSubmit={(values) => this.handleSubmit(values)}>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'marketName'} md={3}>Market Name</Label>
                                            <Col md={9}>
                                                <Control.text model=".marketName" id="marketName" name="marketName"
                                                              placeholder="Market Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(3),
                                                                  maxLength: maxLength(20)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".marketName"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 3 characters ',
                                                        maxLength: 'Must be 20 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'workingDays'} md={4}>Working Days</Label>
                                            <Col md={8}>
                                                <Control.text model=".workingDays" id="workingDays" name="workingDays"
                                                              placeholder="Working Days"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  isNumber,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".workingDays"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        isNumber: 'Must be a number',
                                                        minLength: 'Must be greater than 2 digits ',
                                                        maxLength: 'Must be 10 digits or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="name" md={3}>Country</Label>
                                            <Col md={9}>
                                                <Control.select model={'.name'} name={'name'} defaultValue={this.props.name}
                                                         className={'form-control'}>
                                                {countr}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'marketId'} md={4}>Market Id</Label>
                                            <Col md={8}>
                                                <Control.text model=".marketId" id="marketId" name="marketId"
                                                              placeholder="Market Id"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".marketId"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
             </div>
        )
    }
}

class MarketDeleteForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        let obj={};
        obj.marketId = this.props.market.market.filter((item) => item.marketName === values.market)[0].marketId;
        this.props.deleteMarket(obj);
    }


    render()
    {
         const share=this.props.market.market.map((item) =>{
            return(
                <option>{item.marketName}</option>
            )
        });

        return (
            <div className={'container'}>
                <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Delete Market</h3>
                            <hr/>
                        </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Form model={'marketDeleteForm'} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="market" md={3}>Market Name</Label>
                                            <Col md={9}>
                                                <Control.select model={'.market'} name={'market'}
                                                         className={'form-control'} defaultValue={this.props.marketname}>
                                                {share}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                </div>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 0}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class ShareInsertForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        if(values.shareId && values.shareValue && values.shareName && values.market && values.corporation)
        {
            let obj = {};
            obj.marketId = this.props.market.market.filter((item) => item.marketName === values.market)[0].marketId;
            obj.corpId = this.props.corporation.company.filter((item) => item.corpName === values.corporation)[0].corpId;
            obj = {...obj, ...values}
            //alert(JSON.stringify(obj));
            this.props.insertShare(obj);
        }
        else
        {
            alert("Share Id, value, name, market and corporation are required");
        }
    }

    render()
    {
        const market=this.props.market.market.map((item) =>{
            return(
                <option>{item.marketName}</option>
            )
        });
        const corporation=this.props.corporation.company.map((item) =>{
            return(
                <option>{item.corpName}</option>
            )
        });
        return (
            <div className={'container'}>
                 <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Insert Share</h3>
                            <hr/>
                        </div>
                  </div>
                 <div className={'row'}>
                     <div className={'col-12'}>
                         <Form model={'shareInsertForm'} onSubmit={(values) => this.handleSubmit(values)}>
                             <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'shareName'} md={3}>Share Name</Label>
                                            <Col md={9}>
                                                <Control.text model=".shareName" id="shareName" name="shareName"
                                                              placeholder="Share Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(3),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".shareName"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 3 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'shareValue'} md={4}>Share Value</Label>
                                            <Col md={8}>
                                                <Control.text model=".shareValue" id="shareValue" name="shareValue"
                                                              placeholder="Share Value"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  isNumber,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".shareValue"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        isNumber: 'Must be a number',
                                                        minLength: 'Must be greater than 2 digits ',
                                                        maxLength: 'Must be 10 digits or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="market" md={3}>Market</Label>
                                            <Col md={9}>
                                                <Control.select model={'.market'} name={'market'}
                                                         className={'form-control'} defaultValue={this.props.marketname}>
                                                {market}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="corporation" md={4}>Corporation</Label>
                                            <Col md={8}>
                                                <Control.select model={'.corporation'} name={'corporation'}
                                                         className={'form-control'} defaultValue={this.props.corp}>
                                                {corporation}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'shareId'} md={3}>Share Id</Label>
                                            <Col md={9}>
                                                <Control.text model=".shareId" id="shareId" name="shareId"
                                                              placeholder="Share Id"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".shareId"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 10 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                         </Form>
                     </div>
                 </div>
            </div>
        );
    }
}

class ShareUpdateForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        if(!values.shareValue)
            alert("Share Value is required");
        else
        {
            let obj={...values};
            obj.shareId=this.props.shares.shares.filter((item) => item.shareName===values.shareName)[0].shareId;
            this.props.updateShare(obj);
        }
    }


    render()
    {
         const share=this.props.shares.shares.map((item) =>{
            return(
                <option>{item.shareName}</option>
            )
        });

        return (
            <div className={'container'}>
                <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Update Share</h3>
                            <hr/>
                        </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Form model={'shareUpdateForm'} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="shareName" md={3}>Share Name</Label>
                                            <Col md={9}>
                                                <Control.select model={'.shareName'} name={'shareName'}
                                                         className={'form-control'} defaultValue={this.props.sharename}>
                                                {share}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                </div>
                                <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'shareValue'} md={4}>New Share Value</Label>
                                            <Col md={8}>
                                                <Control.text model=".shareValue" id="shareValue" name="shareValue"
                                                              placeholder="Share Value"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  isNumber,
                                                                  minLength: minLength(2),
                                                                  maxLength: maxLength(10)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".shareValue"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        isNumber: 'Must be a number',
                                                        minLength: 'Must be greater than 2 digits ',
                                                        maxLength: 'Must be 10 digits or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                </div>
                            </div>
                            <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 3}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class ShareDeleteForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
            let obj={...values};
            obj.shareId=this.props.shares.shares.filter((item) => item.shareName===values.shareName)[0].shareId;
            console.log(obj);
            this.props.deleteShare(obj);
    }


    render()
    {
         const share=this.props.shares.shares.map((item) =>{
            return(
                <option>{item.shareName}</option>
            )
        });

        return (
            <div className={'container'}>
                <div className={'row mt-4'}>
                        <div className={'col-12'}>
                            <h3>Delete Share</h3>
                            <hr/>
                        </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Form model={'shareDeleteForm'} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="shareName" md={3}>Share Name</Label>
                                            <Col md={9}>
                                                <Control.select model={'.shareName'} name={'shareName'}
                                                         className={'form-control'} defaultValue={this.props.sharename}>
                                                {share}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                </div>
                                <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Col md={{size: 4, offset: 0}}>
                                                <Button type="submit" color="primary" className={'btn-block'}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class AdminComponent extends Component
{
    render()
    {
        let corp="",market="",country="",sharename="";
        if(this.props.corporation.company[0])
           corp=this.props.corporation.company[0].corpName;
        if(this.props.market.market[0])
           market=this.props.market.market[0].marketName;
        if(this.props.country.country[0])
           country=this.props.country.country[0].name;
        if(this.props.shares.shares[0])
            sharename=this.props.shares.shares[0].shareName;
        return(
            <div>
                <CorpForm insertCorp={this.props.insertCorp} />
                <CorpDeleteForm corporation={this.props.corporation} deleteCorp={this.props.deleteCorp} corp={corp}/>
                <CountryForm insertCountry={this.props.insertCountry}/>
                <CountryDeleteForm deleteCountry={this.props.deleteCountry} country={this.props.country} name={country}/>
                <MarketForm country={this.props.country} insertMarket={this.props.insertMarket} name={country}/>
                <MarketDeleteForm market={this.props.market} deleteMarket={this.props.deleteMarket} marketname={market}/>
                <ShareInsertForm market={this.props.market} corporation={this.props.corporation} corp={corp} marketname={market}
                insertShare={this.props.insertShare}/>
                <ShareUpdateForm shares={this.props.shares} updateShare={this.props.updateShare} sharename={sharename}/>
                <ShareDeleteForm shares={this.props.shares} deleteShare={this.props.deleteShare} sharename={sharename}/>
            </div>
        )
    }
}

export default AdminComponent;