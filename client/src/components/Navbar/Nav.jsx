import { useState } from "react";
import './Nav.css';

function Nav() {
    return (
        <>

            <div className="navbarr pt-3 pb-2">
                <div className="navbar_cards d-flex mx-5 ">
                    <div className="footer-card yellowtext"><span className="navbar_big_Text fw-bolder">PrepYatra</span>
                        <br></br> <span className="text-white pt-0 navbar_small_Text">By Aryan Kumar</span>
                    </div>
                    <div className="footer-card text-end pt-1">
                        <button className="startbtn px-3 py-2">Login</button>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Nav;