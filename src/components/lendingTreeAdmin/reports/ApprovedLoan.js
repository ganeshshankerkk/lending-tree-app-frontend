import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Fragment } from "react";
import { loadingActions } from "../../../store/loadingSlice";
import { loanReportActions } from "../../../store/loanReportSlice";

function ApprovedLoan() {
    const URI = "https://lending-tree-web-app.herokuapp.com";
    const dispatch = useDispatch();
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2', '#F6D6F6', '#DCEBFF', '#FFF2E2', '#F5E5E4', '#FAF5EF', '#ECECEC'];
    let [newLoanCount, setNewLoanCound] = useState(false);
    const [newLoans, setNewLoans] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);

    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/reports-approved/')
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
                setNewLoans(loanRecords);
                if (loanRecords.length === 0) {
                    setNewLoanCound(false)
                } else if (loanRecords.length > 0) {
                    setNewLoanCound(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function filterLoanReports(id) {
        let filteredLoanData = newLoans.filter(function (loanRequest) {
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
        dispatch(loanReportActions.filterLoanReport({ filteredLoanData }));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">New Loan Requests</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !newLoanCount && <p className="text-center text-danger mt-3">No new loan requests so far!</p>}
            {newLoanCount && <div className="row mx-auto">
                {newLoans.map((loan, backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={loan.loanId} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor}>
                                <h5 className="card-title" key={loan.loanId}>Loan Request ID : {loan.loanId}</h5>
                                <p className="card-text">Purpose : {loan.purpose}</p>
                                <p className="card-text">Approval Agency : {loan.assignedToApprovalAgency}</p>
                                <p className="card-text">Status : {loan.status}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" >
                                            <Link className="text-decoration-none text-dark" onClick={() => filterLoanReports(loan.loanId)} to={`/reports/approved/${loan.loanId}`}><BsCardList /> Details</Link>
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
export default ApprovedLoan;