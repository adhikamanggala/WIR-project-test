import React, { Component } from 'react';
import '../../support/css/footer.css'
// import '../support/css/style.css'

class Footer extends Component {
    state = {}

    render() {

        return (

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <h6>Refer.com</h6>
                            <p>ID Travel Agent Licence: 354005.</p>
                            <p>SG Travel Agent Licence: 02851.</p>
                            <p>TW Travel Agent License: 03950.</p>

                        </div>
                        <div className="col-xs-6 col-md-3">
                            <h6>About Refer</h6>
                            <ul className="footer-links">
                                <li><a href="http://scanfcode.com/category/c-language/">About Us</a></li>
                                <li><a href="http://scanfcode.com/category/front-end-development/">Partner With Us</a></li>
                                <li><a href="http://scanfcode.com/category/back-end-development/">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <h6>Partnership</h6>
                            <ul className="footer-links">
                                <li><a href="http://scanfcode.com/about/">Partner Login</a></li>
                                <li><a href="http://scanfcode.com/contact/">Affiliate Partnership</a></li>
                                <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Influencer Program</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <h6>Term Of Use</h6>
                            <ul className="footer-links">
                                <li><a href="http://scanfcode.com/about/">Terms and Condition</a></li>
                                <li><a href="http://scanfcode.com/contact/">Privacy Policy</a></li>
                                <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright © 2018 All Rights Reserved by Refer
                        {/* <a href="#">Scanfcode</a>. */}
                            </p>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="#"><i className="fa fa-facebook" /></a></li>
                                <li><a className="twitter" href="#"><i className="fa fa-twitter" /></a></li>
                                <li><a className="dribbble" href="#"><i className="fa fa-dribbble" /></a></li>
                                <li><a className="linkedin" href="#"><i className="fa fa-linkedin" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }


}


export default Footer;