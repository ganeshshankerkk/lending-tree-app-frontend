import { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
function UserForgotId() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const required = <span className="text-danger">*</span>
    const [userId, setUserId] = useState();
    const [verified, setVerified] = useState(false);
    const forgotIdHandler = (postUserRecords) => {
        let givenEmail = postUserRecords.email;
        let givenfriend = postUserRecords.favoriteChildhoodFriend;
        let givenCity = postUserRecords.cityBornIn;
        let givenNickname = postUserRecords.childhoodNickname
        const response = { givenEmail, givenNickname, givenfriend, givenCity }
        fetch("http://localhost:8897/email=" + givenEmail + "/nickname=" + givenNickname + "/friend=" + givenfriend + "/city=" + givenCity + "/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response(statusCode) {
                if (statusCode.status === 401) {
                    setVerified(false);
                    window.alert("The verification information provided does not match. You have entered a wrong security question's answer.");
                } else if (statusCode.status === 404) {
                    setVerified(false)
                    window.alert("No such user exists");
                } else if (statusCode.status === 200) {
                    setVerified(true);
                    return statusCode.json();
                }
            }
        ).then(function (udata) {
            try {
                JSON.parse(udata)
                setUserId(JSON.parse(udata))
            }
            catch (errror) {
                return;
            }
        })
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Recover User ID</h1>
            <form className="form-group col-lg-5 col-md-7 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(forgotIdHandler)}>
                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-6">Verify it's you</p>
                </div>
                <p className="mt-3">Fields marked with {required} are mandatory</p>
                <div className="col">
                    <label htmlFor="Email">Email {required}</label>
                    <input
                        type="text"
                        id="email"
                        className={`form-control mb-3 ${errors.email && "invalid border-danger"}`}
                        {...register('email', {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })} />
                    <p className="text-danger" id="userIdValidation"></p>
                    {errors.email?.type === "required" && <p className="text-danger">Email is required</p>}
                    {errors.email?.type === "pattern" && <p className="text-danger">Please enter a valid Email Address</p>}
                </div>
                <label htmlFor="securityquestion">What was your childhood nickname? {required}</label>
                <input
                    type="text"
                    id="childhoodNickname"
                    className={`form-control mb-3 ${errors.childhoodNickname && "invalid border-danger"}`}
                    {...register('childhoodNickname', { required: true })} />
                {errors.childhoodNickname?.type === "required" && <p className="text-danger">Security question is required</p>}
                <label htmlFor="securityquestion">What is the name of your favorite childhood friend? {required}</label>
                <input
                    type="text"
                    id="favoriteChildhoodFriend"
                    className={`form-control mb-3 ${errors.favoriteChildhoodFriend && "invalid border-danger"}`}
                    {...register('favoriteChildhoodFriend', { required: true })} />
                {errors.favoriteChildhoodFriend?.type === "required" && <p className="text-danger">Security question is required</p>}
                <label htmlFor="securityquestion">What's the name of the city where you were born? {required}</label>
                <input
                    type="text"
                    id="cityBornIn"
                    className={`form-control mb-3 ${errors.cityBornIn && "invalid border-danger"}`}
                    {...register('cityBornIn', { required: true })} />
                {errors.cityBornIn?.type === "required" && <p className="text-danger">Security question is required</p>}
                <button type="submit" id="registerBtn" className="btn btn-primary">Submit</button>&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>
            </form>
            {verified && <div className="text-center mx-auto col-2 bg-light mt-4">
                <p className="display-6">User ID : {userId}</p>
                <Link to="/login" className="link-primary text-decoration-none"><p>Login To My Account</p></Link>
            </div>}
        </Fragment>
    )
}
export default UserForgotId;