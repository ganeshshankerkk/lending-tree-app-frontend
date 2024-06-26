import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Fragment } from "react";
import { loadingActions } from "../../../store/loadingSlice";
import { rejectedLoanActions } from "../../../store/rejectedLoanSlice";

function AllRejectedLoans(){
    const URI = "https://lending-tree.up.railway.app";
    const dispatch = useDispatch();
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2','#F6D6F6','#DCEBFF','#FFF2E2','#F5E5E4','#FAF5EF','#ECECEC'];
    let [rejectedLoanCount, setRejectedLoanCount] = useState(false);
    const [rejectedLoanRecords, setRejectedLoanRecords] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
  
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/reports-rejected/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const loanRecords = data.map(loanDetails => {
                    return {
                        loanId: loanDetails.loanId,
                        amount: loanDetails.amount,
                        id: loanDetails.id,
                        requestedDateTime: loanDetails.requestedDateTime,
                        tenure: loanDetails.tenure,
                        interestRate: loanDetails.interestRate,
                        purpose: loanDetails.purpose,
                        panNumber: loanDetails.panNumber,
                        monthlySalary: loanDetails.monthlySalary,
                        assignedToApprovalAgency: loanDetails.assignedToApprovalAgency,
                        assignedToPickUpAgent: loanDetails.assignedToPickUpAgent,
                        assignedToVerificationAgent: loanDetails.assignedToVerificationAgent,
                        assignedToLegalDepartment: loanDetails.assignedToLegalDepartment,
                        status: loanDetails.status,
                        remarks: loanDetails.remarks
                    }
                })
                setRejectedLoanRecords(loanRecords);
                if (loanRecords.length === 0) {
                    setRejectedLoanCount(false)
                } else if (loanRecords.length > 0) {
                    setRejectedLoanCount(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function filterRejectedLoan(id) {
        let filteredLoanData = rejectedLoanRecords.filter(function (loanRequest) {
            return loanRequest.loanId === id;
        }).map(function ({ loanId, amount, purpose, monthlySalary,
            tenure, interestRate, id,
            panNumber, requestedDateTime, assignedToApprovalAgency, assignedToPickUpAgent,
            assignedToVerificationAgent, assignedToLegalDepartment, status, remarks },) {
            return {
                loanId, amount, requestedDateTime,
                id, tenure, interestRate,
                purpose, monthlySalary, panNumber, assignedToApprovalAgency, assignedToPickUpAgent,
                assignedToVerificationAgent, assignedToLegalDepartment, status, remarks
            };
        })
        dispatch(rejectedLoanActions.individualRejectedLoanRecords({ filteredLoanData }));
    }
    return(
  <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Rejected Loan Requests</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}

            {!loadingData && !rejectedLoanCount && <p className="text-center text-danger mt-3">No loan requests rejected so far!</p>}
            {rejectedLoanCount && <div className="row mx-auto">
                {rejectedLoanRecords.map((loan,backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={loan.loanId} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor}>
                                <h5 className="card-title" key={loan.loanId}>Loan Request ID : {loan.loanId}</h5>
                                <p className="card-text">Purpose : {loan.purpose}</p>
                                <p className="card-text">Approval Agency : {loan.assignedToApprovalAgency}</p>
                                <p className="card-text">Pickup Agent : {loan.assignedToPickUpAgent}</p>
                                <p className="card-text">Person Verification : {loan.assignedToVerificationAgent}</p>
                                <p className="card-text">Legal Verification : {loan.assignedToLegalDepartment}</p>
                                <p className="card-text">Status : {loan.status}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" >
                                            <Link className="text-decoration-none text-dark" onClick={() => filterRejectedLoan(loan.loanId)} to={`/reports/rejected/${loan.loanId}`}><BsCardList /> Details</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </Fragment>
    )
}
export default AllRejectedLoans;