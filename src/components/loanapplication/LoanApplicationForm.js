import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadingActions } from "../../store/loadingSlice";
function LoanApplicationForm() {
    const URI = "lending-tree.up.railway.app";
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userId = useSelector(state => state.loginState.loggedUserRecords.givenId);
    const dispatch = useDispatch();
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const required = <span className="text-danger">*</span>
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let dateTime = date + ' ' + time;

    function onLoanFormSubmit(loanData) {
        dispatch(loadingActions.dataIsLoading());
        let id = userId;
        let amount = parseInt(loanData.amount);
        let tenure = loanData.tenure;
        let interestRate = loanData.interestRate;
        let purpose = loanData.purpose;
        let panNumber = loanData.panNumber;
        let requestedDateTime = loanData.requestedDateTime;
        let monthlySalary = parseInt(loanData.monthlySalary);
        let saveData = { id, amount, tenure, requestedDateTime, interestRate, purpose, panNumber, monthlySalary };
        fetch(URI+"/newloan", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveData)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Details saved successfully")
                history.replace("/dashboard");
            }
        ).catch(function error() {
            dispatch(loadingActions.dataLoaded());
            alert("Server failed to respond!")
        })

    }


    return (
        <Fragment>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            <form className="form-group col-lg-4 col-md-7 mx-auto mb-3 px-3 py-3 bg-light" onSubmit={handleSubmit(onLoanFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3 mb-3">
                    <p className="display-5">Loan Application</p>
                    <p>Apply online for personal loans in India!</p>
                </div>
                <label htmlFor="date">Date</label>
                <input type="text" readOnly
                    id="date"
                    name="date"
                    className="form-control mb-3"
                    {...register('requestedDateTime')}
                    defaultValue={dateTime}
                />
                <label htmlFor="id">Loan Amount {required}</label>
                <input type="number"
                    name="id"
                    id="amount"
                    className={`form-control mb-3 ${errors.amount && "invalid border-danger"}`}
                    {...register('amount', {
                        required: true,
                        pattern: /^[0-9]+$/g,
                        min: 50000,
                        max: 5000000
                    })} />
                {errors.amount?.type === "required" && <p className="text-danger">Loan amount is required</p>}
                {errors.amount?.type === "pattern" && <p className="text-danger">Please enter a valid amount</p>}
                {errors.amount?.type === "min" && <p className="text-danger">Minimum loan amount : ₹50000</p>}
                {errors.amount?.type === "min" && <p className="text-danger">Maximum loan amount : ₹500000</p>}



                <label htmlFor="tenure">Loan Tenure (in months) {required}</label>
                <input type="number"
                    name="tenure"
                    id="amount"
                    className={`form-control mb-3 ${errors.tenure && "invalid border-danger"}`}
                    {...register('tenure', {
                        required: true,
                        min: 12,
                        pattern: /^[0-9]+$/g,
                    })} />
                {errors.tenure?.type === "required" && <p className="text-danger">Loan Tenure is required</p>}
                {errors.tenure?.type === "pattern" && <p className="text-danger">Please enter a valid tenure period</p>}
                {errors.tenure?.type === "min" && <p className="text-danger">Minimum loan tenure for personal loan is 12 months</p>}



                <label htmlFor="tenure">Interest Rate (%)</label>
                <input readOnly type="number"
                    name="interestRate"
                    id="interestrate"
                    value="7.5"
                    className={`form-control mb-3 ${errors.interestRate && "invalid border-danger"}`}
                    {...register('interestRate')} />


                <label htmlFor="loanPurpose">Purpose {required}</label>
                <textarea
                    type="text"
                    id="purpose"
                    rows="4"
                    className={`form-control mb-3 ${errors.purpose && "invalid border-danger"}`}
                    {...register('purpose', { required: true })} />
                {errors.purpose?.type === "required" && <p className="text-danger">loan purpose cannot be empty</p>}


                <label htmlFor="panNumber">PAN Number {required}</label>
                <input
                    type="textarea"
                    id="panNumber"
                    className={`form-control mb-3 ${errors.panNumber && "invalid border-danger"}`}
                    {...register('panNumber', { required: true })} />
                {errors.panNumber?.type === "required" && <p className="text-danger">PAN number cannot be empty</p>}


                <label htmlFor="monthlySalary">Monthly Income {required}</label>
                <input
                    type="textarea"
                    id="monthlySalary"
                    className={`form-control mb-3 ${errors.monthlySalary && "invalid border-danger"}`}
                    {...register('monthlySalary', { required: true, min: 15000, pattern: /^[0-9]+$/g, })} />
                {errors.monthlySalary?.type === "required" && <p className="text-danger">Net salary cannot be empty</p>}
                {errors.monthlySalary?.type === "pattern" && <p className="text-danger">Please enter valid salary</p>}
                {errors.monthlySalary?.type === "min" && <p className="text-danger">Minimum monthly income to awail personal loan is ₹15000</p>}


                <div className="d-grid gap-2">
                    <button type="submit" id="registerBtn" className="btn btn-primary mb-3"><FaRupeeSign /> Apply Loan </button>
                </div>
            </form>
        </Fragment>
    )
}
export default LoanApplicationForm;