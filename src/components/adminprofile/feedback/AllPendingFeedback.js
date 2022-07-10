import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Fragment } from "react";
import { filterFeedbackActions } from "../../../store/filterFeedbackSlice";

function AllPendingFeedback() {
    const dispatch = useDispatch();

    const pendingFeedbackData =  useSelector(state => state.filterFeedback.filteredFeedback);

    function filterPendingFeedback(loanId) {
        let pendingFeedbackSurvey = pendingFeedbackData.filter(function (loanRequest) {
            return loanRequest.loanid === loanId;
        }).map(function ({ loanid},) {
            return {
                loanid
            };
        })
        dispatch(filterFeedbackActions.pendingFeedbackLoans({ pendingFeedbackSurvey }));
    }
    return (
        <Fragment>
         <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Pending Feedback</h1>
           <div className="row mx-auto">
                {pendingFeedbackData.map((user) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3"  key={user.loanid} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title" key={user.loanid}>Loan Request ID : {user.loanid}</h5>
                                <p className="card-text">Status : {user.status}</p>
                                <p className="card-text">Feedback : {user.feedback}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterPendingFeedback(user.loanid)}>
                                            <Link className="text-decoration-none text-dark" to={`/pending-feedback/${user.loanid}`}><BsCardList /> Submit Feedback</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}
export default AllPendingFeedback;
