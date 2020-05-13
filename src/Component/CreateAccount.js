import React, {Component} from "react";
import {Form,Control,Errors} from "react-redux-form";
import {Button, Col, Label, Row} from "reactstrap";
import {Loading} from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class CreateAccount extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {

        if(values.username && values.lastname && values.password)
        {
            alert("Current State is: " + JSON.stringify(values));
            this.props.createAccount(values);
        }
        else
        {
            alert("username, lastname and password is compulsory");
        }
    }
    render()
    {
        const countr=this.props.country.country.map((item) =>{
            return(
                <option>{item.name}</option>
            )
        });
        if(this.props.accountCreation.isLoading===true)
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <Loading />
                    </div>
                </div>
                );
        else
        {
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <h3>Create Account</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <Form model={'createaccount'} onSubmit={(values) => this.handleSubmit(values)}
                                  validators={{
                                      '': {
                                          passwordsMatch: (vals) => vals.password === vals.rpassword,
                                          licence: (vals) =>
                                          {
                                              if (vals.broker)
                                                  return (vals.LicenceNumber && vals.LicenceNumber.length);
                                              else
                                                  return 1;
                                          },
                                          ranges: (vals) =>
                                          {
                                              if (vals.broker)
                                                  return ((0 <= parseFloat(vals.commission)) && (parseFloat(vals.commission) <= 100));
                                              else
                                                  return true;
                                          },
                                          isNumberCommision: (vals) =>
                                          {
                                              if (vals.broker)
                                                  return !isNaN(Number(vals.commission));
                                              else
                                                  return true;
                                          }
                                      },
                                  }}>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor={'username'} md={3}>User name</Label>
                                            <Col md={9}>
                                                <Control.text model=".username" id="username" name="username"
                                                              placeholder="User Name"
                                                              className="form-control"
                                                              validators={{
                                                                  maxLength: maxLength(15)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".username"
                                                    show="touched"
                                                    messages={{
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'firstname'} md={3}>First name</Label>
                                            <Col md={9}>
                                                <Control.text model=".firstname" id="firstname" name="firstname"
                                                              placeholder="First Name"
                                                              className="form-control"
                                                              validators={{
                                                                  maxLength: maxLength(15)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".firstname"
                                                    show="touched"
                                                    messages={{
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={'lastname'} md={3}>Last name</Label>
                                            <Col md={9}>
                                                <Control.text model=".lastname" id="lastname" name="lastname"
                                                              placeholder="Last Name"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(3),
                                                                  maxLength: maxLength(15)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".lastname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters ',
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="phone" md={3}>Phone</Label>
                                            <Col md={9}>
                                                <Control.text model=".phone" id="phone" name="phone"
                                                              placeholder="Phone Number"
                                                              className="form-control"
                                                              validators={{
                                                                  required,
                                                                  minLength: minLength(3),
                                                                  maxLength: maxLength(15),
                                                                  isNumber
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".phone"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required  ',
                                                        minLength: 'Must be greater than 2 numbers ',
                                                        maxLength: 'Must be 15 numbers or less ',
                                                        isNumber: 'Must be a number'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="country" md={3}>Country</Label>
                                            <Col md={9}>
                                                <Control.select model={'.country'} name={'country'}
                                                         className={'form-control'}>
                                                {countr}
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-9'}>
                                        <Row className="form-group">
                                            <Label htmlFor="gender" md={2}>Select Gender</Label>
                                            <Col md={3}>
                                                <Control.select model={'.gender'} name={'.gender'}
                                                                className={'form-control'}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </Control.select>
                                            </Col>
                                            <Col md={{size: 4, offset: 1}}>
                                                <div className="form-check">
                                                    <Label check>
                                                        <Control.checkbox model=".broker" name="broker"
                                                                          className="form-check-input"
                                                        /> {' '}
                                                        <strong>Sign up as a Broker ?</strong>
                                                    </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-8 col-md-3'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor="type" md={4}>Broker Type</Label>
                                            <Col md={8}>
                                                <Control.select model={'.type'} name={'.type'}
                                                                className={'form-control'}>
                                                    <option>full service</option>
                                                    <option>discount</option>
                                                    <option>online broker</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-9'}>
                                        <Row className="form-group">
                                            <Label htmlFor="LicenceNumber" md={2}>Licence Number</Label>
                                            <Col md={4}>
                                                <Control.text model=".LicenceNumber" id="LicenceNumber"
                                                              name="LicenceNumber"
                                                              placeholder="Only for broker"
                                                              className="form-control"
                                                              validators={{
                                                                  maxLength: maxLength(12)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".LicenceNumber"
                                                    show="touched"
                                                    messages={{
                                                        maxLength: 'Must be 12 Characters or less '
                                                    }}
                                                />
                                                <Errors model={'createaccount'}
                                                        className={'text-danger'}
                                                        messages={{
                                                            licence: "Please enter licence number"
                                                        }}
                                                />
                                            </Col>
                                            <Label htmlFor={"company"} md={2}>Company</Label>
                                            <Col md={3}>
                                                <Control.text model=".company" id="company" name="company"
                                                              placeholder="Only for broker"
                                                              className="form-control"
                                                              validators={{
                                                                  maxLength: maxLength(12)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".company"
                                                    show="touched"
                                                    messages={{
                                                        maxLength: 'Must be 12 Characters or less '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6 col-md-3'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor={"commission"} md={4}>commission</Label>
                                            <Col md={8}>
                                                <Control.text model=".commission" id="commission" name="commission"
                                                              placeholder="Only for broker"
                                                              className="form-control"
                                                              validators={{
                                                                  maxLength: maxLength(12)
                                                              }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".commission"
                                                    show="touched"
                                                    messages={{
                                                        maxLength: 'Must be 12 Characters or less '
                                                    }}
                                                />
                                                <Errors model="createaccount"
                                                        className={'text-danger'}
                                                        show="touched"
                                                        messages={{
                                                            ranges: 'values must be in 0 and 100  ',
                                                            isNumberCommision: "Must be a number"
                                                        }}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className={'form-group'}>
                                            <Label htmlFor="address" md={3}>Your Address</Label>
                                            <Col md={9}>
                                                <Control.textarea model=".address" id="address" name="address"
                                                                  rows="3"
                                                                  className="form-control"/>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="password" md={3}>Enter Your Password</Label>
                                            <Col md={9}>
                                                <Control.password model=".password" id="password" name="password"
                                                                  placeholder="Password"
                                                                  className="form-control"
                                                                  validators={{
                                                                      required, minLength: minLength(8)
                                                                  }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".password"
                                                    show="touched"
                                                    messages={{
                                                        minLength: 'Must be greater than 8 Characters ',
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'col-6'}>
                                        <Row className="form-group">
                                            <Label htmlFor="password" md={3}>Re-Enter Password</Label>
                                            <Col md={9}>
                                                <Control.password model=".rpassword" id="rpassword" name="rpassword"
                                                                  placeholder="Password"
                                                                  className="form-control"
                                                                  validators={{
                                                                      required, minLength: minLength(8)
                                                                  }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".rpassword"
                                                    show="touched"
                                                    messages={{
                                                        minLength: 'Must be greater than 8 Characters ',
                                                    }}
                                                />
                                                <Errors model="createaccount"
                                                        className={'text-danger'}
                                                        show="touched"
                                                        messages={{
                                                            passwordsMatch: 'Password doesn\'t match  ',
                                                        }}/>
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
}


export default CreateAccount;

