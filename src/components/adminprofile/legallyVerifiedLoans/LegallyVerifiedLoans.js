import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { filterAppAgencyLoanActions } from "../../../store/filterApprovalAgencyApprovedLoanSlice";
import { loadingActions } from "../../../store/loadingSlice";

function LegallyVerifiedLoans(){
    const URI = "http://qr-code.ap-south-1.elasticbeanstalk.com";
    const dispatch = useDispatch();
    let [completedLoanRequests, setCompletedLoanRequests] = useState(false);
    const [legallyVerifiedLoanRequests, setLegallyVerifiedLoanRequests] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/loans/approved')
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
                    }
                })
                setLegallyVerifiedLoanRequests(loanRecords);
                if (loanRecords.length === 0) {
                    setCompletedLoanRequests(false)
                } else if (loanRecords.length > 0) {
                    setCompletedLoanRequests(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function filterLoan(loanId) {
        let filteredLoanData = legallyVerifiedLoanRequests.filter(function (loanRequest) {
            return loanRequest.loanId === loanId;
        }).map(function ({ loanId, amount, purpose, monthlySalary,
            tenure, interestRate, id,
            panNumber, requestedDateTime },) {
            return {
                loanId, amount, requestedDateTime,
                id, tenure, interestRate,
                purpose, monthlySalary, panNumber
            };
        })
        dispatch(filterAppAgencyLoanActions.individualLoanRecord({ filteredLoanData }));
    }
    return(
        <Fragment>
<h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Legally Verified Loan Applications</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !completedLoanRequests && <p className="text-center text-danger mt-3">No legally verified loans available. Please check back later!</p>}
            {completedLoanRequests && <div className="row mx-auto">
                {legallyVerifiedLoanRequests.map((user) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={user.loanId} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title" key={user.loanId}>Loan Request ID : {user.loanId}</h5>
                                <p className="card-text">Purpose : {user.purpose}</p>
                                <p className="card-text">Requested Date : {user.requestedDateTime}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterLoan(user.loanId)}>
                                            <Link className="text-decoration-none text-dark" to={`/loans/approved/${user.loanId}`}><BsCardList /> Details</Link>
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
export default LegallyVerifiedLoans;