import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import verification from '../../images/verification.jpg'
function PickUpAgentProfile() {

    let history = useHistory();

    function pendingLoanHandler() {
        history.push("/pickup/pending");
    }
    return (
        <Fragment>
            <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                <img className="card-img-top" src={verification} alt="viewLoanRequest">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Assigned Loan Requests</h5>
                    <p className="card-text">Loan requests waiting physical verification.</p>
                    <button className="btn btn-info" onClick={pendingLoanHandler}>View pending requests</button>
                </div>
            </div>
        </Fragment>
    )
}
export default PickUpAgentProfile;