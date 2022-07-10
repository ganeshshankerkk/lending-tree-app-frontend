import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { ImArrowLeft2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { loadingActions } from "../../../store/loadingSlice";
import AvailableVerificationDeptAgents from "./AvailableVerificationDeptAgents";
function IndividualLoanApplicationRecords() {
    let history = useHistory();
    let dispatch = useDispatch();
    const [isRejectingLoan, setIsRejectingLoan] = useState(false);
    const filteredLoanDataById = useSelector(state => state.filterAppAgencyLoan.filteredLoanDataById);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isAssigningtoVerificationDept, setIsAssigningToVerificationDept] = useState(false);
    const required = <span className="text-danger">*</span>
    const loadingData = useSelector(state => state.loadingState.isLoading);

    function chooseVerificationDeptAgent() {
        setIsAssigningToVerificationDept(true)
    }

    function rejectLoan(rejectionRemarks) {
        let remarks = rejectionRemarks.remarks;
        const loanId = filteredLoanDataById.map((loanId) => {
            return loanId.loanId;
        })
        let response = { loanId, remarks }
        dispatch(loadingActions.dataIsLoading());
        fetch("http://localhost:8897/reject-pending-loan/id=" + loanId + "/remarks=" + remarks + "/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Loan Request Rejected By Agency Admin")
                history.replace("/pending-verification")
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
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">{isAssigningtoVerificationDept ? 'Available Person Department Agents' : 'Pending Loan Requests'}</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!isRejectingLoan && !isAssigningtoVerificationDept && <div>
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
                        <button className="btn btn-dark"><Link className="text-decoration-none text-white" to="/pending-verification"><ImArrowLeft2 /> Go Back</Link></button> &nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-success" onClick={chooseVerificationDeptAgent}>Map to Verification Dept Employee <IoIosPersonAdd /></button>&nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-danger" onClick={rejectLoanRemarks}>Reject <FaTimes /></button> &nbsp;
                    </div>
                </div>
            </div>}
            {isRejectingLoan && !isAssigningtoVerificationDept && <div>
                <form className="form-group col-lg-4 col-md-7 mt-4 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(rejectLoan)}>
                    <label htmlFor="rejectionReason">Remarks {required}</label>
                    <textarea
                        type="text"
                        id="remarks"
                        rows="4"
                        placeholder="Provide the reason for rejecting the loan request"
                        className={`form-control mt-3 mb-3 ${errors.remarks && "invalid border-danger"}`}
                        {...register('remarks', { required: true })} />
                    {errors.remarks?.type === "required" && <p className="text-danger">Remarks is required</p>}
                    <div className="float-end">
                        <div className="btn-group me-2 mb-2" role="group">
                            <button type="button" className="btn btn-dark" onClick={cancelLoanRejection}><ImArrowLeft2 /> Go Back</button> &nbsp;
                        </div>
                        <div className="btn-group me-2 mb-2" role="group">
                            <button type="submit" className="btn btn-danger">Reject Loan</button>
                        </div>
                    </div>
                </form>
            </div>}
            {!isRejectingLoan && isAssigningtoVerificationDept && <AvailableVerificationDeptAgents/>}
        </Fragment>
    )
}
export default IndividualLoanApplicationRecords;