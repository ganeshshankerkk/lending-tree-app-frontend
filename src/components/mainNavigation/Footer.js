import { Fragment } from "react";
import './Footer.css'
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <Fragment>
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-text">
                            <p>&copy; 2021 - {currentYear} | Lending Tree</p>
                            <p>Developed by <a href="https://ganeshshanker.com" target="_blank" rel="noopener noreferrer"><b>Ganesh Shanker K K</b></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Footer;