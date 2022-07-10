import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import newloan from '../../../images/newloan.jpeg'
import verified from '../../../images/verified.png'
import legal from '../../../images/legal.jpg'
import dropped from '../../../images/dropped.jpg'
import agent from '../../../images/agent.jpg'

function AdminProfile() {
    let history = useHistory();
    function routeToPickup() {
        history.push("/pending-loan");
    }
    function routeToVerification() {
        history.push("/pending-verification");
    }
    function routeToLegalVerification() {
        history.push("/legal-verification");
    }
    function legallyVerifiedLoanRequests() {
        history.push("/loans/approved");
    }
    function droppedLoans(){
        history.push('/loans/rejected/');
    }
    return (
        <Fragment>
            <div className="row mx-auto">
                <div className="col-lg-2 col-md col-sm-12 mr-3">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={newloan} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">New Loan</h5>
                            <p className="card-text">Loans approved by approval agency. To be routed to pick up.</p>
                            <button className="btn btn-info" onClick={routeToPickup} >View All</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={agent} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Physically Verified Loans</h5>
                            <p className="card-text">Approve physically verified loans to route to verification team</p>
                            <button className="btn btn-info" onClick={routeToVerification}>View All </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={verified} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Verified Loans</h5>
                            <p className="card-text">Approve verified loans to route to legal verification team</p>
                            <button className="btn btn-info" onClick={routeToLegalVerification}>View All</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={legal} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Legally Verified Loans</h5>
                            <p className="card-text">Approve legally verified loans to mark loan status as approved</p>
                            <button className="btn btn-info" onClick={legallyVerifiedLoanRequests}>View All</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={dropped} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Dropped Loans</h5>
                            <p className="card-text">View all dropped loans during verification</p>
                            <button className="btn btn-info" onClick={droppedLoans}>View Dropped Loans</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default AdminProfile;