import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import backgroundverification from '../../images/backgroundverification.jpeg'
function VerificationDepartmentProfile() {
    let history = useHistory();

    function pendingPersonVerificationHandler() {
        history.push("/verification/pending");
    }
    return (
        <Fragment>
            <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                <img className="card-img-top" src={backgroundverification} alt="viewLoanRequest">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Assigned Loan Requests</h5>
                    <p className="card-text">Loan requests waiting person verification.</p>
                    <button className="btn btn-info" onClick={pendingPersonVerificationHandler}>View pending requests</button>
                </div>
            </div>
        </Fragment>
    )
}
export default VerificationDepartmentProfile;