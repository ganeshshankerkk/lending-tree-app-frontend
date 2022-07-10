import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import loan from '../../images/loan.jpg'
function ApprovalAgencyProfile() {

    let history = useHistory();

    function pendingLoanHandler() {
        history.push("/pendingloan");
    }
    return (
        <Fragment>
            <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                <img className="card-img-top" src={loan} alt="viewLoanRequest">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Loan Requests</h5>
                    <p className="card-text">Loan requests waiting approval.</p>
                    <button className="btn btn-info" onClick={pendingLoanHandler}>View all</button>
                </div>
            </div>
        </Fragment>
    )
}
export default ApprovalAgencyProfile;