import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterLoanActions } from "../../store/filteredLoanSlice";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { FaRegLaugh } from "react-icons/fa";
import { loadingActions } from "../../store/loadingSlice";

function TrackApplicationStatus() {
    const URI = "https://lending-tree-web-app.herokuapp.com";
    const link = "text-decoration-none";
    const dispatch = useDispatch();
    let [appliedLoans, setAppliedLoans] = useState(false);
    const [appliedLoanDetails, setAppliedLoanDetails] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const userId = useSelector(state => state.loginState.loggedUserRecords.givenId);
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2', '#F6D6F6', '#DCEBFF', '#FFF2E2', '#F5E5E4', '#FAF5EF', '#ECECEC'];
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/tracking/id=' + userId + '/')
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
                        status : loanDetails.status,
                        remarks: loanDetails.remarks
                    }
                });
                setAppliedLoanDetails(loanRecords);
                if (loanRecords.length === 0) {
                    setAppliedLoans(false)
                } else if (loanRecords.length > 0) {
                    setAppliedLoans(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch, userId])


    function filterLoan(loanId) {
        let filteredLoanData = appliedLoanDetails.filter(function (loanRequest) {
            return loanRequest.loanId === loanId;
        }).map(function ({ loanId, amount, purpose, monthlySalary,
            tenure, interestRate, id,
            panNumber, requestedDateTime, status, remarks },) {
            return {
                loanId, amount, requestedDateTime,
                id, tenure, interestRate,
                purpose, monthlySalary, panNumber, status, remarks
            };
        })
        dispatch(filterLoanActions.individualLoanRecords({ filteredLoanData }));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Applied Loans</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !appliedLoans && <p className="text-center text-danger mt-3">You have not applied for any loans so far! Please
                <Link className={link} to="/apply-loan"> click here</Link> to apply new loan request now. <FaRegLaugh style={{ color: 'black' }} />
            </p>}
            {appliedLoans && <div className="row mx-auto">
                {appliedLoanDetails.map((loan, backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={loan.loanId} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor} >
                                <h5 className="card-title" key={loan.loanId}>Loan Request ID : {loan.loanId}</h5>
                                <p className="card-text">Purpose : {loan.purpose}</p>
                                <p className="card-text">Requested Date & Time : {loan.requestedDateTime}</p>
                                <p className="card-text">Status : {loan.status}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterLoan(loan.loanId)}>
                                            <Link className="text-decoration-none text-dark" to={`/tracking/${loan.loanId}`}><BsCardList /> Details</Link>
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
export default TrackApplicationStatus;