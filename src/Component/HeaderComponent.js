import React,{Component} from "react";
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, FormGroup, Label, Input
} from "reactstrap";
import {Link, NavLink} from 'react-router-dom';
class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isNavOpen: false,
            isModOpen:false
        };
        this.toggleMod=this.toggleMod.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }
    handleLogout()
    {
        this.props.logoutUser();

    }
    toggleNav()
    {
        this.setState(
            {
                isNavOpen : !this.state.isNavOpen
            });
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
        this.props.loginUser({username:this.username.value,password:this.password.value,isAuthenticated:false});
    }
    render()
    {
        return (
           <div>
            <Navbar dark expand={'md'}>
                <div className="container">
                <NavbarToggler onClick={()=>this.toggleNav()} />
                    <Link to={'/home'}><NavbarBrand className={"mr-auto"} > <img src={'assets/images/logo.png'} height={'30'} width={'41'} alt={"Mind Trade"} />
                    </NavbarBrand></Link>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/stock'><span className="fa fa-list fa-lg"></span> Stocks</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                         <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleMod}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            <NavLink to={'/user'}><span className="fa fa-user fa-lg mr-2"></span>
                                                <div className="navbar-text mr-3">{this.props.auth.creds.username}</div>
                                            </NavLink>
                                            <Link to={'/home'} className={'link'}>
                                            <Button outline onClick={this.handleLogout} >
                                                <span className="fa fa-sign-out fa-lg"></span>
                                                Logout
                                                {this.props.auth.isLoading ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                            </Link>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                    </Collapse>
                </div>
            </Navbar>
           <div className="Jumbotron">
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1 >Mind Trade</h1>
                       <p>
                           <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum et fuga iure minus optio
                               quaerat quasi quos sequi! Accusamus delectus ipsa labore maxime minima minus nam odit
                               perspiciatis provident quo!</span>
                       </p>
                   </div>
               </div>
           </div>
           <Modal isOpen={this.state.isModOpen} toggle={this.toggleMod}>
               <ModalHeader toggle={this.toggleMod}>
                Login
               </ModalHeader>
               <ModalBody>
                   <Form onSubmit={this.handleSubmit}>
                       <FormGroup>
                           <Label htmlFor={'username'}> Username</Label>
                           <Input id={'username'} type={'text'} name={'username'} innerRef={(input)=>
                           this.username=input} />
                       </FormGroup>
                       <FormGroup>
                           <Label htmlFor={'password'}> Password</Label>
                           <Input id={'password'} type={'password'} name={'password'} innerRef={(input)=>
                           this.password=input} />
                       </FormGroup>
                       <FormGroup check>
                           <Label check>
                               <Input id={'remeber'} type={'checkbox'} name={'remember'} innerRef={(input)=>
                           this.remember=input} />
                           Remember Me
                           </Label>
                       </FormGroup>
                       <Button type={'submit'} color={'primary'} role={'button'}>Submit</Button>
                       <Button onClick={() => {window.location.href="createAccount"}}  color={'success'} role={'button'} className={'ml-2'}>Register</Button>
                   </Form>
               </ModalBody>
           </Modal>
           </div>
           </div>
        );
    }
}
export default Header;