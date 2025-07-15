import { useState } from "react";
import './Footer.css';

function Footer() {
    return (
        <>
            <div className="footer  mx-0 pt-5">
                <div className="footer-cards d-flex mx-5 mb-5">
                    <div className="footer-card yellowtext text-start"><span className="footerBigText fw-bolder">PrepYatra</span>
                        <br></br> <span className="text-white ">By Aryan Kumar</span>
                    </div>
                    <div className="footer-card text-end">Our Products
                        <br></br> <span className="text-white ">By Aryan Kumar</span>
                    </div>
                </div>
                <p className="pb-2 mb-0">Built with ❤️ by  <span className="yellowtext fw-bolder">Aryan Kumar</span></p>
            </div>
        </>
    )

}

export default Footer;