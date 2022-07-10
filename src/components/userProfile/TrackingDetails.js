import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { IoMdPrint } from "react-icons/io";
import './TrackingDetails.css'
function TrackingDetails() {
    const filteredLoanDataById = useSelector(state => state.filterLoan.filteredLoanDataById);
    const [status, setStatus] = useState('');
    const [percentage, setPercentage] = useState();
    const [bgColor, setBgColor] = useState();
    useEffect(() => {
        let loanStatus = filteredLoanDataById.map((userId) => {
            return userId.status;
        })
        const loanApplicationStatus = loanStatus.toString();
        switch (loanApplicationStatus) {
            case 'pending': {
                setStatus("Pending");
                setPercentage("33.33%")
                setBgColor(("progress-bar progress-bar-striped bg-info"))
                break;
            }
            case 'processing': {
                setStatus("Processing");
                setPercentage("66.66%")
                setBgColor(("progress-bar progress-bar-striped bg-primary"))
                break;
            }
            case 'rejected': {
                setStatus("Rejected");
                setPercentage("100%");
                setBgColor(("progress-bar progress-bar-striped bg-danger"))
                break;
            }
            case 'approved': {
                setStatus("Approved");
                setPercentage("100%");
                setBgColor(("progress-bar progress-bar-striped bg-success"))
                break;
            }
            default: {
                setStatus("Tracking Details")
            }
        }
    }, [filteredLoanDataById])

    return (
        <Fragment>

            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Loan Application Status</h1>
            <div>
                <div className="col-lg-5 col-md-7 mx-auto mt-3 px-3 noprint">
                    <div className="progress" style={{ height: '40px' }}>
                        <div className={bgColor} role="progressbar" style={{ width: percentage}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <p className="status-style">{status}</p>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5 px-3">

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
                                    <td className={filteredUserData.status ==='rejected' ? 'text-danger' : 'text-primary'} >{filteredUserData.status}</td>
                                </tr>
                                {filteredUserData.status === 'rejected' && <tr>
                                    <th>Remarks</th>
                                    <td>{filteredUserData.remarks}</td>
                                </tr>}
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="noprint btn btn-secondary"><Link className="text-decoration-none text-white" to="/tracking"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="noprint btn btn-success" onClick={()=> {window.print()}}>Print <IoMdPrint /> </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default TrackingDetails;