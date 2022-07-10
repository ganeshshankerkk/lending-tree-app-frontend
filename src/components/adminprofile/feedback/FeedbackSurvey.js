import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadingActions } from "../../../store/loadingSlice";
function FeedbackSurvey() {
    const URI = "https://lending-tree-web-app.herokuapp.com";
    const pendingFeedbackData =  useSelector(state => state.filterFeedback.filteredFeedback);
    const loanId = pendingFeedbackData.map((loan) => {
        return loan.loanid;
    })
   const  loanid = loanId.toString();
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userid = useSelector(state => state.loginState.loggedUserRecords.givenId);
    const dispatch = useDispatch();
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const required = <span className="text-danger">*</span>

    function onLoanFormSubmit(feedback) {
        const satisfied = feedback.satisfied;
        const problemsInApplyingLoan= feedback.problemsInApplyingLoan
        const  recommendationScale= feedback.recommendationScale
        const  anyOtherRecommendation = feedback.anyOtherRecommendation
        dispatch(loadingActions.dataIsLoading());
      const response ={loanid, userid,satisfied,problemsInApplyingLoan,recommendationScale,anyOtherRecommendation}
        fetch(URI+"/new-feedback/id=" + loanid , {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Thank you for your valuable feedback! We appreciate your response.")
                history.replace("/dashboard");
            }
        ).catch(function error() {
            dispatch(loadingActions.dataLoaded());
            alert("Server failed to respond!")
        })

    }
    return (
        <Fragment>
             <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-6 text-center">Feedback</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            <form className="form-group col-lg-4 col-md-7 mx-auto mb-3 px-3 py-3 bg-light" onSubmit={handleSubmit(onLoanFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3 mb-3">
                    <p className="display-6">We'd love to hear from you!</p>
                </div>
                <label htmlFor="question one">Were you satisfied with the loan services we provided you? {required}</label>
                <div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="yes" className="form-check-label"> Yes </label>
                        <input type="radio"
                            name="satisfaction"
                            
                            className="form-check-input"
                            value="yes"
                            {...register('satisfied', {
                                required: true
                            })} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="no" className="form-check-label"> No </label>
                        <input type="radio"
                            name="satisfaction"
                            value="no"
                            className="form-check-input"
                            {...register('satisfied', {
                                required: true
                            })} />
                    </div>
                </div>
                {errors.satisfied?.type === "required" && <p className="text-danger">*Required Field</p>}
                <label htmlFor="id">Did you experience any problem applying for a new loan? {required}</label>
                <input type="text"
                    name="id"
                    id="amount"
                    className={`form-control mb-3 ${errors.problemsInApplyingLoan && "invalid border-danger"}`}
                    {...register('problemsInApplyingLoan', {
                        required: true
                    })} />
                {errors.problemsInApplyingLoan?.type === "required" && <p className="text-danger">*Required Field</p>}

                <label htmlFor="id">How likely are you to recommend our services to your friends/colleagues? {required}</label>
                <div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="1" className="form-check-label"> 1 </label>
                        <input type="radio"
                            name="recommendation"
                            className="form-check-input"
                            value="1"
                            {...register('recommendationScale', {
                                required: true
                            })} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="2" className="form-check-label"> 2 </label>
                        <input type="radio"
                            name="recommendation"
                            value="2"
                            className="form-check-input"
                            {...register('recommendationScale', {
                                required: true
                            })} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="3" className="form-check-label"> 3 </label>
                        <input type="radio"
                            name="recommendation"
                            value="3"
                            className="form-check-input"
                            {...register('recommendationScale', {
                                required: true
                            })} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="4" className="form-check-label"> 4 </label>
                        <input type="radio"
                            name="recommendation"
                            value="4"
                            className="form-check-input"
                            {...register('recommendationScale', {
                                required: true
                            })} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label htmlFor="5" className="form-checyk-label"> 5 </label>
                        <input type="radio"
                            name="recommendation"
                            value="5"
                            className="form-check-input"
                            {...register('recommendationScale', {
                                required: true
                            })} />
                    </div>
                    {errors.recommendationScale?.type === "required" && <p className="text-danger">*Required Field</p>}

                </div>

                <label htmlFor="id">Is there anything you'd like to add? We love feedback.</label>
                <textarea type="text"
                    name="id"
                    id="amount"
                    rows="4"
                    className={`form-control mb-3 ${errors.anyOtherRecommendation && "invalid border-danger"}`}
                    {...register('anyOtherRecommendation', {
                    })} />



                <div className="d-grid gap-2">
                    <button type="submit" id="registerBtn" className="btn btn-primary mb-3">Submit </button>
                </div>
            </form>
        </Fragment>
    )
}
export default FeedbackSurvey;