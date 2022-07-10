import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { ImArrowLeft2 } from "react-icons/im";
import { useForm } from "react-hook-form";
function FilteredPendingLoan() {
    const URI = "https://lending-tree-app.herokuapp.com";
    let history = useHistory();
    const [isRejectingLoan, setIsRejectingLoan] = useState(false);
    const filteredLoanDataById = useSelector(state => state.filterLoan.filteredLoanDataById);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const required = <span className="text-danger">*</span>


    function approveLoanRequest() {
        const id = filteredLoanDataById.map((userId) => {
            return userId.loanId;
        })
        fetch(URI+"/approvingagency/" + id, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        }).then(
            function response() {
                window.alert("Loan Request Approved")
                history.replace("/pendingloan")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }

    function rejectLoan(rejectionRemarks) {
        let remarks = rejectionRemarks.remarks;
        const loanId = filteredLoanDataById.map((loanId) => {
            return loanId.loanId;
        })
        let response = {loanId,remarks}
        fetch(URI+"/rejectloan/id=" + loanId + "/remarks=" + remarks + "/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response() {
                window.alert("Loan Request Rejected")
                history.replace("/pendingloan")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }
    function rejectLoanRemarks() {
        setIsRejectingLoan(true);
    }
    function cancelLoanRejection() {
        setIsRejectingLoan(false);
    }

    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Loan Details</h1>
            {!isRejectingLoan && <div>
                <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5">

                    {filteredLoanDataById.map((filteredUserData) => (
                        <table className="table table-striped" key={filteredUserData.loanId}>
                            <tbody>
                                <tr>
                                    <th>Loan ID</th>
                                    <th>{filteredUserData.loanId}</th>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td>{filteredUserData.amount}</td>
                                </tr>
                                <tr>
                                    <th>Requested User ID</th>
                                    <td>{filteredUserData.id}</td>
                                </tr>
                                <tr>
                                    <th>Date Requested</th>
                                    <td>{filteredUserData.requestedDateTime}</td>
                                </tr>
                                <tr>
                                    <th>Tenure</th>
                                    <td>{filteredUserData.tenure}</td>
                                </tr>
                                <tr>
                                    <th>Interest Rate</th>
                                    <td>{filteredUserData.interestRate}</td>
                                </tr>
                                <tr>
                                    <th>Purpose</th>
                                    <td>{filteredUserData.purpose}</td>
                                </tr>
                                <tr>
                                    <th>PAN Number</th>
                                    <td>{filteredUserData.panNumber}</td>
                                </tr>
                                <tr>
                                    <th>Monthly Salary</th>
                                    <td>{filteredUserData.monthlySalary}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-dark"><Link className="text-decoration-none text-white" to="/pendingloan"><ImArrowLeft2 /> Go Back</Link></button> &nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-success" onClick={approveLoanRequest}>Approve <MdDone /></button>&nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-danger" onClick={rejectLoanRemarks}>Reject <FaTimes /></button> &nbsp;
                    </div>
                </div>
            </div>}
            {isRejectingLoan && <div>
                <form className="form-group col-lg-4 col-md-7 mt-4 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(rejectLoan)}>
                    <label htmlFor="rejectionReason">Remarks {required}</label>
                    <textarea
                        type="textarea"
                        id="remarks"
                        rows="4"
                        placeholder="Provide the reason for rejecting the loan request"
                        className={`form-control mt-3 mb-3 ${errors.remarks && "invalid border-danger"}`}
                        {...register('remarks', { required: true})} />
                    {errors.remarks?.type === "required" && <p className="text-danger">Remarks is required</p>}
                    <div className="float-end">
                        <div className="btn-group me-2 mb-2" role="group">
                            <button type="button" className="btn btn-dark" onClick={cancelLoanRejection}><ImArrowLeft2 /> </button> &nbsp;
                        </div>
                        <div className="btn-group me-2 mb-2" role="group">
                            <button type="submit" className="btn btn-danger">Reject Loan</button>
                        </div>
                    </div>
                </form>
            </div>}
        </Fragment>
    )
}
export default FilteredPendingLoan;
