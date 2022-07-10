import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import feedback from '../../images/feedback.jpg'
import reports from '../../images/reports.jpg'
import approvedTicket from '../../images/approvedTicket.jpg'
import help from '../../images/help.png'
function LendingTreeAdminProfile() {
    let history = useHistory();
    function viewTickets() {
        history.push('/pending-tickets');
    }
    function viewAllApprovedTickets() {
        history.push('/resolved-tickets');
    }
    function viewAllFeedbacks(){
        history.push('/feedbacks/')
    }
    function viewReports(){
        history.push('/reports/')
    }
    return (
        <Fragment>
            <div className="row mx-auto">
                <div className="col-lg-3 col-md col-sm-12 mr-3">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={help} alt="helpticket">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Help Tickets</h5>
                            <p className="card-text">Tickets raised by users waiting resolution.</p>
                            <button className="btn btn-info" onClick={viewTickets} >View Tickets</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md col-sm-12 mr-3">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={approvedTicket} alt="helpticket">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Resolved Tickets</h5>
                            <p className="card-text">View a list of all resolved tickets.</p>
                            <button className="btn btn-info" onClick={viewAllApprovedTickets} >View All</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={feedback} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Feedbacks</h5>
                            <p className="card-text">View feedbacks by users for approved loan requests.</p>
                            <button className="btn btn-info" onClick={viewAllFeedbacks} >View Feedbacks</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={reports} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Reports</h5>
                            <p className="card-text">View complete report of loan requests</p>
                            <button className="btn btn-info" onClick={viewReports}>View Reports</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default LendingTreeAdminProfile;