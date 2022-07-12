import { Fragment } from "react";
import Footer from "../mainNavigation/Footer";
import MainNavigation from "../mainNavigation/MainNavigation";
import './layout.css';
function Layout(props) {
    return (
        <Fragment>
            <div className="page-container">
                <div className="content-wrap">
                <MainNavigation />
                <main>{props.children}</main>
            </div>
            <Footer />
        </div>
        </Fragment >
    )
}
export default Layout;