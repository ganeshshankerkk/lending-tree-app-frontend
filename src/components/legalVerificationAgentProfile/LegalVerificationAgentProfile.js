import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import legalverification from '../../images/legalverification.jpg'
function LegalVerificationAgentProfile() {
    

    let history = useHistory();

    function pendingLoanHandler() {
        history.push("/pending/legal-verification/");
    }
    return (
        <Fragment>
                  <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                <img className="card-img-top" src={legalverification} alt="viewLoanRequest">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Assigned Loan Requests</h5>
                    <p className="card-text">Loan requests waiting legal verification.</p>
                    <button className="btn btn-info" onClick={pendingLoanHandler}>View all</button>
                </div>
            </div>
        </Fragment>
    )
}
export default LegalVerificationAgentProfile;