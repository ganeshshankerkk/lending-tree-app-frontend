import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterLoanActions } from "../../store/filteredLoanSlice";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { loadingActions } from "../../store/loadingSlice";
function AllPendingLegalVerification() {
    const URI = "https://lending-tree.up.railway.app";
    const dispatch = useDispatch();
    let [pendingApprovalRequest, setPendingApprovalRequest] = useState(false);
    const [pendingLoanDetails, setPendingLoanDetails] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const agentId = useSelector(state => state.loginState.loggedAgentRecord.id)
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2','#F6D6F6','#DCEBFF','#FFF2E2','#F5E5E4','#FAF5EF','#ECECEC'];
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/pending/legal-verification/agentid=' + agentId + '/')
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
                });
                setPendingLoanDetails(loanRecords);
                if (loanRecords.length === 0) {
                    setPendingApprovalRequest(false)
                } else if (loanRecords.length > 0) {
                    setPendingApprovalRequest(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch, agentId])


    function filterLoan(loanId) {
        let filteredLoanData = pendingLoanDetails.filter(function (loanRequest) {
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
        dispatch(filterLoanActions.individualLoanRecords({ filteredLoanData }));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Pending Loan Request</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !pendingApprovalRequest && <p className="text-center text-danger mt-3">No pending loan requests!</p>}
            {pendingApprovalRequest && <div className="row mx-auto">
                {pendingLoanDetails.map((user, backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={user.loanId} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor} >
                                <h5 className="card-title" key={user.loanId}>Loan Request ID : {user.loanId}</h5>
                                <p className="card-text">Purpose : {user.purpose}</p>
                                <p className="card-text">Requested Date & Time : {user.requestedDateTime}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterLoan(user.loanId)}>
                                            <Link className="text-decoration-none text-dark" to={`/pending/legal-verification/${user.loanId}`}><BsCardList /> Details</Link>
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
export default AllPendingLegalVerification;