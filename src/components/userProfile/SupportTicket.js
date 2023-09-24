import { Fragment } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/loadingSlice";
function SupportTicket() {
    const URI = "lending-tree.up.railway.app";
    const userid = useSelector(state => state.loginState.loggedUserRecords.givenId);
    const dispatch = useDispatch();
    const loadingData = useSelector(state => state.loadingState.isLoading);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const required = <span className="text-danger">*</span>
    const onTicketSubmitHandler = (postUserRecords) => {
        const title = postUserRecords.title;
        const date = postUserRecords.date;
        const description = postUserRecords.description;
        const postData = { userid, title, date, description }
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+"/ticket/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Ticket Raised Successfully. Our Support team will get back to you shortly.")
                history.replace("/dashboard")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
            dispatch(loadingActions.dataLoaded());
        })
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Got a question?</h1>
            <form className="form-group col-lg-5 col-md-7 mx-auto mb-5 px-3 py-3 bg-light" onSubmit={handleSubmit(onTicketSubmitHandler)}>
                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-6"><GiTicket /> Raise a Ticket </p>
                </div>
                <p className="mt-3">Fields marked with {required} are mandatory</p>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="text" readOnly
                        id="date"
                        name="date"
                        className="form-control mb-3"
                        {...register('date')}
                        defaultValue={dateTime}
                    />
                    <label htmlFor="title">Title {required} </label>
                    <input
                        type="text"
                        id="title"
                        className={`form-control mb-3 ${errors.title && "invalid border-danger"}`}
                        {...register('title', { required: true, minLength: 5 })} />
                    {errors.title?.type === "required" && <p className="text-danger">Title is required</p>}
                    {errors.title?.type === "minLength" && <p className="text-danger">Minimum 5 Characters required</p>}
                </div>
                <div className="col">
                    <label htmlFor="description">Description {required}</label>
                    <textarea
                        type="text"
                        id="description"
                        rows="4"
                        placeholder="What is the issue about?"
                        className={`form-control mb-3 ${errors.description && "invalid border-danger"}`}
                        {...register('description', { required: true, minLength: 10 })} />
                    {errors.description?.type === "required" && <p className="text-danger">Description is required</p>}
                    {errors.description?.type === "minLength" && <p className="text-danger">Minimum 10 Characters required</p>}
                </div>
                <button type="submit" id="registerBtn" className="btn btn-primary">Submit Ticket</button>&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>
            </form>
            {loadingData && <div className="text-center">
                <div className="spinner-border" role="status">
                </div>
            </div>}
        </Fragment>
    )
}
export default SupportTicket;