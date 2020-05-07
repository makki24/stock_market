import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home" style={{color:'blue'}}>Home</Link></li>
                            <li><Link to="/stock" style={{color:'blue'}}>Stock</Link></li>
                            <li><Link to="/contactus" style={{color:'blue'}}>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Office</h5>
                            <address>
                            32 , Mehta Mahal, Mathew Road, Girgaon<br />
                            Mumbai,  Maharashtra<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +912 1234 5678<br />
                            <i className="fa fa-fax"></i>: +912 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confused@mind.net" style={{color:'blue'}}>confused@mind.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2020 Mind Trade</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;