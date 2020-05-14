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
        if(this.state.file)
        {
            const formData = new FormData();
            formData.append('imageFile', this.state.file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            let obj={image:'images/'+this.state.file.name};
            obj={...obj,...values,formData};
            this.props.insertCorp(obj);
        }
        else
            alert('Please select the file')
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

class CountryForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        this.props.insertCountry(values);
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


class MarketForm extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        this.props.insertMarket(values);
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
                                                <Control.select model={'.name'} name={'name'}
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
class AdminComponent extends Component
{
    render()
    {
        return(
            <div>
                <CorpForm insertCorp={this.props.insertCorp} />
                <CountryForm insertCountry={this.props.insertCountry}/>
                <MarketForm country={this.props.country} insertMarket={this.props.insertMarket}/>
            </div>
        )
    }
}

export default AdminComponent;