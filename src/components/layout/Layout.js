import { Fragment } from "react";
import Footer from "../mainNavigation/Footer";
import MainNavigation from "../mainNavigation/MainNavigation";

function Layout (props){
    return(
        <Fragment>
            <MainNavigation/>
            <main>{props.children}</main>
            <Footer/>
        </Fragment>
    )
}
export default Layout;