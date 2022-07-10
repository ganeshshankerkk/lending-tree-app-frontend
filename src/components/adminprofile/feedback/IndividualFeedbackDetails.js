import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
function IndividualFeedbackDetails(){
    const filteredFeedbackRecords = useSelector(state => state.filterAllFeedbackAdmin.filteredFeedback);

    return(
        <Fragment>
  <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Feedback Details</h1>
            <div>
                <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5">

                    {filteredFeedbackRecords.map((feedback) => (
                        <table className="table table-striped" key={feedback.id}>
                            <tbody>
                                <tr>
                                    <th>Feedback ID</th>
                                    <th>{feedback.id}</th>
                                </tr>
                                <tr>
                                    <th>Loan ID</th>
                                    <td>{feedback.loanid}</td>
                                </tr>
                                <tr>
                                    <th>User ID</th>
                                    <td>{feedback.userid}</td>
                                </tr>
                                <tr>
                                    <th>Were you satisfied with the loan services we provided you?</th>
                                    <td>{feedback.satisfied}</td>
                                </tr>
                                <tr>
                                    <th>Did you experience any problem applying for a new loan?</th>
                                    <td>{feedback.problemsInApplyingLoan}</td>
                                </tr>
                                <tr>
                                    <th>How likely are you to recommend our services to your friends/colleagues? </th>
                                    <td>{feedback.recommendationScale}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
            <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-info"><Link className="text-decoration-none text-white" to="/feedbacks/"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                  
                </div>
        </Fragment>
    )
}
export default IndividualFeedbackDetails;