import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import loan from '../../../images/loan.jpg';
import approved from '../../../images/approved.jpg';
import rejected from '../../../images/rejected.jpg';

function Reports() {
    let history = useHistory();
    function newLoans() {
        history.push('/reports/new-loans/');
    }
    function approvedLoans() {
        history.push('/reports/approved/');
    }
    function rejectedLoans() {
        history.push('/reports/rejected/')
    }
    return (
        <Fragment>
            <div className="row mx-auto">
                <div className="col-lg-3 col-md col-sm-12 mr-3">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={loan} alt="helpticket">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">New Loans</h5>
                            <p className="card-text">Loan requests waiting approval by the approval agency</p>
                            <button className="btn btn-info" onClick={newLoans} >View New Loans</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md col-sm-12 mr-3">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={approved} alt="helpticket">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Approved Loans</h5>
                            <p className="card-text">Loan Requests approved by the loan agency admin</p>
                            <button className="btn btn-info" onClick={approvedLoans} >View Approved Loans</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={rejected} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Rejected Loans</h5>
                            <p className="card-text">Loan requests rejected by the loan agency admin</p>
                            <button className="btn btn-info" onClick={rejectedLoans} >View Rejected Loans</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Reports;