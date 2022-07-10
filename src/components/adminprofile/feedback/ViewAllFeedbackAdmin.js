import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Fragment } from "react";
import { loadingActions } from "../../../store/loadingSlice";
import { feedbackActions } from "../../../store/adminFeedbackSlice";

function ViewAllFeedbackAdmin() {
    const dispatch = useDispatch();
    const URI = "https://lending-tree-web-app.herokuapp.com";
    let [feedbackCount, setFeedbackCount] = useState(false);
    const [feedbackRecords, setFeedbackRecords] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2','#F6D6F6','#DCEBFF','#FFF2E2','#F5E5E4','#FAF5EF','#ECECEC'];
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/feedback/all')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const feedbackData = data.map(feedback => {
                    return {
                        id: feedback.id,
                        userid: feedback.userid,
                        loanid: feedback.loanid,
                        satisfied: feedback.satisfied,
                        anyOtherRecommendation: feedback.anyOtherRecommendation,
                        recommendationScale: feedback.recommendationScale,
                        problemsInApplyingLoan: feedback.problemsInApplyingLoan,
                    }
                })
                setFeedbackRecords(feedbackData);
                if (feedbackData.length === 0) {
                    setFeedbackCount(false)
                } else if (feedbackData.length > 0) {
                    setFeedbackCount(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function filterFeedback(id) {
        let filteredFeedbackRecords= feedbackRecords.filter(function (loanRequest) {
            return loanRequest.id === id;
        }).map(function ({ id, userid, loanid, satisfied, problemsInApplyingLoan, recommendationScale, anyOtherRecommendation }) {
            return {
                id, userid, loanid, satisfied, problemsInApplyingLoan, recommendationScale,
                anyOtherRecommendation,
            };
        })
        dispatch(feedbackActions.allFeedbacks({ filteredFeedbackRecords}));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">All Feedbacks</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !feedbackCount && <p className="text-center text-danger mt-3">No feedbacks available!</p>}
            {feedbackCount && <div className="row mx-auto">
                {feedbackRecords.map((feedback,backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={feedback.id} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor}>
                                <h5 className="card-title" key={feedback.id}>Feedback ID : {feedback.id}</h5>
                                <p className="card-text">User ID : {feedback.userid}</p>
                                <p className="card-text">Loan ID : {feedback.loanid}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterFeedback(feedback.id)}>
                                            <Link className="text-decoration-none text-dark" to={`/feedbacks/${feedback.id}`}><BsCardList /> Read More</Link>
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
export default ViewAllFeedbackAdmin;