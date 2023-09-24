import { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
function UserForgotPassword() {
    const URI = "https://lending-tree.up.railway.app";
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const required = <span className="text-danger">*</span>
    const [identityVerified, setIdentityVerified] = useState(false)
    const[id, setId] = useState('');
    const onRegistrationFormSubmit = (postUserRecords) => {
 
        let givenid = postUserRecords.id;
        let givenfriend = postUserRecords.favoriteChildhoodFriend;
        let givenCity = postUserRecords.cityBornIn;
        let givenNickname = postUserRecords.childhoodNickname
        const response = { givenid, givenNickname, givenfriend, givenCity }
        fetch(URI+"/id=" + givenid + "/nickname=" + givenNickname + "/friend=" + givenfriend + "/city=" + givenCity + "/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response(statusCode) {
                if (statusCode.status === 200) {
                    setId(postUserRecords.id);
                    setIdentityVerified(true)
                    alert("Identity verified")
                } else if (statusCode.status === 401) {
                    window.alert("The verification information provided does not match. You have entered a wrong security question's answer.");
                } else if (statusCode.status === 404) {
                    window.alert("User ID doesn't Exists");
                }
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }
    function changePassword(newPassword) {
        let password = newPassword.password
        const response = {id,password}
        fetch(URI+"/userid=" + id + "/new-password=" + password  + "/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response() {
                    alert("Password changed successfully")
                    history.replace('/login')
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }
    return (
        <Fragment>
          <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Change Password</h1>
            {!identityVerified && <form className="form-group col-lg-5 col-md-7 mx-auto mb-5 px-3 py-3 bg-light" onSubmit={handleSubmit(onRegistrationFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-6">Verify it's you</p>
                </div>
                <p className="mt-3">Fields marked with {required} are mandatory</p>
                <div className="col">
                    <label htmlFor="userId">User ID {required}</label>
                    <input
                        type="text"
                        id="id"
                        className={`form-control mb-3 ${errors.id && "invalid border-danger"}`}
                        {...register('id', {
                            required: true,
                            pattern: /^[0-9]+$/g,
                        })} />
                    <p className="text-danger" id="userIdValidation"></p>
                    {errors.id?.type === "required" && <p className="text-danger">User ID is required</p>}
                    {errors.id?.type === "pattern" && <p className="text-danger">*Accepts only numbers</p>}
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
            </form>}
            {identityVerified && <form className="form-group col-lg-5 col-md-7 mx-auto mb-5 px-3 py-3 bg-light" onSubmit={handleSubmit(changePassword)}>
                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-5">New Password</p>
                </div>
                <p className="mt-3">Fields marked with {required} are mandatory</p>
                <div className="col">
                    <label htmlFor="password">New Password {required}</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control mb-3 ${errors.password && "invalid border-danger"}`}
                        {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />
                    {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                    {errors.password?.type === "pattern" && <p className="text-danger">Minimum eight characters, at least one letter and one number</p>}
                </div>
                <button type="button" className="btn btn-dark" onClick={()=> {setIdentityVerified(false)}} ><ImArrowLeft2 /> Back</button>&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>&nbsp;
                <div className="float-end">

                <button type="submit" id="registerBtn" className="btn btn-success">Change Password</button>&nbsp;
                </div>
            </form>}

        </Fragment>
    )
}
export default UserForgotPassword;