import React, {Component} from "react";
import {Form,Control,Errors} from "react-redux-form";
import {Button, Col, Label, Row} from "reactstrap";
import {baseUrl} from "../shared/baseUrl";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const axios = require("axios");


class AdminComponent extends Component
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

export default AdminComponent;