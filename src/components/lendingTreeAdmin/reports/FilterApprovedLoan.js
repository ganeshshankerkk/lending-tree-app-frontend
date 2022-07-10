import { Fragment, } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { IoMdPrint } from "react-icons/io";
import './FilterApprovedLoan.css'
function FilterApprovedLoan() {
    const filteredLoanDataById = useSelector(state => state.loanReport.filterLoanReport);
    return (
        <Fragment>
                        <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">New Loan Request Details</h1>
            <div>
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
                                <tr>
                                    <th>Status</th>
                                    <td>{filteredUserData.status}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="noprint btn btn-dark"><Link className="text-decoration-none text-white" to="/reports/approved/"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                    
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="noprint btn btn-success" onClick={()=> {window.print()}}>Print <IoMdPrint /> </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default FilterApprovedLoan;