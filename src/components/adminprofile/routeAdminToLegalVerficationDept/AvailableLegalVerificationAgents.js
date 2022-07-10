import { Fragment, useEffect, useState } from "react";
import { ImUserCheck } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadingActions } from "../../../store/loadingSlice";

function AvailableLegalVerificationAgents(){
    const URI = "https://lending-tree-app.herokuapp.com";
    const dispatch = useDispatch();
    let history = useHistory();
    let [verificationAgent, setLegalVerificationAgent] = useState(false);
    const [agentRecords, setAgentRecords] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2','#F6D6F6','#DCEBFF','#FFF2E2','#F5E5E4','#FAF5EF','#ECECEC'];
    const getLoanId = useSelector(state => state.filterAppAgencyLoan.filteredLoanDataById);
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/legal-verification-agents/')
            .then(response => {
                return response.json();
            })
            .then(getAgent => {
                const loanRecords = getAgent.map(verificationAgent => {
                    return {
                        id: verificationAgent.id,
                        firstName: verificationAgent.firstName,
                        lastName: verificationAgent.lastName,
                        category: verificationAgent.category,
                        department: verificationAgent.department,
                        assignedLoanRequests: verificationAgent.assignedLoanRequests,
                    }
                });
                setAgentRecords(loanRecords);
                if (loanRecords.length === 0) {
                    setLegalVerificationAgent(false)
                } else if (loanRecords.length > 0) {
                    setLegalVerificationAgent(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function legalVerificationAgent(agentId) {
        const loanId = getLoanId.map((id) => {
            return id.loanId;
        })
        const assignToLegalDept = { loanId, agentId };
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+"/assign-legal-verification/loanid=" + loanId + "/agentid=" + agentId + "/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignToLegalDept)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Assigned to legal verification agent for legal verification")
                history.replace("/legal-verification")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }
    return(
        <Fragment>
  {!loadingData && !verificationAgent && <p className="text-center text-danger mt-3">No verification agents available at this moment! Please check back later.</p>}
            {verificationAgent && <div className="row mx-auto">
                {agentRecords.map((agent, backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={agent.id} style={{ width: '18rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor}>
                                <h5 className="card-title" key={agent.loanId}> {agent.firstName} {agent.lastName} </h5>
                                <p className="card-text">Agent ID : {agent.id}</p>
                                <p className="card-text">category : {agent.category}</p>
                                <p className="card-text">Department : {agent.department}</p>
                                <p className="card-text">Pending Verification : {agent.assignedLoanRequests}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn rounded-pill btn-primary position-relative"  onClick={() => legalVerificationAgent(agent.id)} >Assign &nbsp;
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {agent.assignedLoanRequests}</span><ImUserCheck />
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
export default AvailableLegalVerificationAgents;