import { Fragment } from "react";
import './Footer.css'
function Footer(){
    return(
        <Fragment>
            <div className="d-flex flex-column">
                <div className="wrapper flex-grow-1"></div>
                <footer>
                    <div className="fixed-bottom nav pt-1 footer text-center bg-dark justify-content-center">
                        <p className="footerCredits">© 2021<b> Lending Tree</b></p>
                    </div>
                </footer>
            </div>
        </Fragment>
    )
}
export default Footer;