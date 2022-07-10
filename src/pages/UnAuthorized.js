import { Fragment } from "react";
import { Link } from "react-router-dom";
import './UnAuthorized.css'
function UnAuthorized() {
    const URI = "/";
    const link = "text-decoration-none"
    return (
        <Fragment>
            <div className="mx-auto text-center mt-5">
                <p className="error-message text-danger">Unauthorized Access</p>
                <p className="error-text">You are not authorized to view this page. Please
                    <Link className={link} to={URI}> switch</Link> or
                    <Link className={link} to="/login"> login</Link> to your account.</p>
            </div>
        </Fragment>
    )
}
export default UnAuthorized;