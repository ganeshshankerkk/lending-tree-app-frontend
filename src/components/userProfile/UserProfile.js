import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import rupeeIcon from '../../images/rupeeIcon.png';
import support from '../../images/support.jpg';
import loanstatus from '../../images/loanstatus.jpg';
import ticket from '../../images/ticket.png';
import feedback from '../../images/feedback.jpg'
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterFeedbackActions } from "../../store/filterFeedbackSlice";

function UserProfile() {
    const URI = "https://lending-tree.up.railway.app";
    const userid = useSelector(state => state.loginState.loggedUserRecords.givenId);
    let dispatch = useDispatch();
    let [approvedLoans, setApprovedLoans] = useState(false);
    useEffect(() => {
        fetch(URI+'/pending-feedback/userid='  + userid )
            .then(response => {
                return response.json();
            })
            .then(data => {
                const pendingFeedbackSurvey = data.map(loanDetails => {
                    return {
                        loanid: loanDetails.loanId,
                        id: loanDetails.id,
                        status: loanDetails.status,
                        feedback: loanDetails.feedback,
                    }
                })
                dispatch(filterFeedbackActions.pendingFeedbackLoans({ pendingFeedbackSurvey }));
                if (pendingFeedbackSurvey.length === 0) {
                    setApprovedLoans(false)
                } else if (pendingFeedbackSurvey.length > 0) {
                    setApprovedLoans(true);
                }
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch, userid])
    let history = useHistory();

    function applyNewLoan() {
        history.push("/apply-loan")
    }

    function viewLoanDetails() {
        history.push("/tracking")
    }
    function requestSupport() {
        history.push("/ticket")
    }
    function ticketStatus() {
        history.push("/ticket/status");
    }
    function submitFeedback() {
        history.push("/pending-feedback")
    }
    return (
        <Fragment>
            <div className="row mx-auto">
                <div className="col-lg-4 col-md col-sm-12 mr-3">
                    <div className="col-lg-4 col-md col-sm-12">
                        {approvedLoans && <div className="card mt-5 mx-5 mb-5" style={{ width: '18rem' }}>
                            <img className="card-img-top" src={feedback} alt="feedback">
                            </img>
                            <div className="card-body">
                                <h5 className="card-title">Feedback</h5>
                                <p className="card-text"> How was your experience with our loan services? Please let us know your thoughts!</p>
                                <button className="btn btn-info" onClick={submitFeedback}>Submit Feedback <FaArrowCircleRight /></button>
                            </div>
                        </div>}
                    </div>
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={rupeeIcon} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Personal Loans</h5>
                            <p className="card-text">Enjoy quick, paperless disbursal in a few click with Lending Tree loans.</p>
                            <button className="btn btn-info" onClick={applyNewLoan}>Apply Now <FaArrowCircleRight /></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={loanstatus} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Track Application Status</h5>
                            <p className="card-text">If you have raised a loan request, track your application status by clicking the button below.</p>
                            <button className="btn btn-info" onClick={viewLoanDetails}>Track Now <FaArrowCircleRight /></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md col-sm-12">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={support} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">Raise a support ticket</h5>
                            <p className="card-text"> Having trouble using our application or applying for a new loan?</p>
                            <button className="btn btn-info" onClick={requestSupport}>Raise a ticket <FaArrowCircleRight /></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md col-sm-12 pb-5">
                    <div className="card mt-5 mx-5" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={ticket} alt="personalLoan">
                        </img>
                        <div className="card-body">
                            <h5 className="card-title">My Tickets</h5>
                            <p className="card-text"> Already raised a ticket? View the status of your ticket here</p>
                            <button className="btn btn-info" onClick={ticketStatus}>Ticket Status <FaArrowCircleRight /></button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default UserProfile;