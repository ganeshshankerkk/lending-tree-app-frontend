import { Fragment, useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import './UserRegistration.css'

function UserRegistration() {
    const URI = "https://lending-tree-app.herokuapp.com";
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const required = <span className="text-danger">*</span>
    const [idisValid, setIdIsValid] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);



    const onRegistrationFormSubmit = (postUserRecords) => {

        fetch(URI+"/register/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postUserRecords)
        }).then(
            function response() {
                window.alert("New user created successfully")
                history.replace("/login")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }

    return (
        <Fragment>
            <form className="form-group col-lg-5 col-md-7 mx-auto mb-5 px-3 py-3 bg-light" onSubmit={handleSubmit(onRegistrationFormSubmit)}>

                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-5">New User Registration</p>
                </div>

                <p className="mt-3">Fields marked with {required} are mandatory</p>
                <div className="row">
                    <div className="col">

                        <label htmlFor="firstName">First Name {required} </label>
                        <input
                            type="text"
                            id="firstName"
                            className={`form-control mb-3 ${errors.firstName && "invalid border-danger"}`}
                            {...register('firstName', { required: true, minLength: 3, pattern: /^[a-zA-Z ]+$/g })} />

                        {errors.firstName?.type === "required" && <p className="text-danger">*First Name is required</p>}
                        {errors.firstName?.type === "minLength" && <p className="text-danger">*Minimum 3 Characters required</p>}
                        {errors.firstName?.type === "pattern" && <p className="text-danger">*Accepts only Alphabets and Space</p>}

                    </div>
                    <div className="col">

                        <label htmlFor="lastName">Last Name {required}</label>
                        <input
                            type="text"
                            id="lastName"
                            className={`form-control mb-3 ${errors.lastName && "invalid border-danger"}`}
                            {...register('lastName', { required: true, pattern: /^[a-zA-Z ]+$/g })} />

                        {errors.lastName?.type === "required" && <p className="text-danger">Last Name is required</p>}
                        {errors.lastName?.type === "pattern" && <p className="text-danger">*Accepts only Alphabets and Space</p>}

                    </div>

                </div>


                <label htmlFor="dateOfBirth">Date Of Birth {required}</label>
                <input type="date"
                    id="dateOfBirth"
                    max='2003-08-15'
                    className={`form-control mb-3 ${errors.dateOfBirth && "invalid border-danger"}`}
                    {...register('dateOfBirth', { required: true })} />

                {errors.dateOfBirth?.type === "required" && <p className="text-danger">Date of Birth is required</p>}

                <label htmlFor="Gender">Gender {required}</label>
                <div className="mb-2">
                    <input type="radio"
                        id="male"
                        name="gender"
                        className="form-check-input"
                        {...register('gender', { required: true })} value="male" />&nbsp;
                    <label htmlFor="male" className="form-check-label">Male</label>&nbsp;

                    <input type="radio"
                        id="female"
                        name="gender"
                        className="form-check-input"
                        {...register('gender', { required: true })} value="female" />&nbsp;
                    <label htmlFor="female" className="form-check-label">Female</label>&nbsp;

                    <input type="radio"
                        id="preferNotToSay"
                        name="gender"
                        className="form-check-input"
                        {...register('gender', { required: true })} value="prefer not to say" />&nbsp;
                    <label htmlFor="preferNotToSay" className="form-check-label">Prefer not to say</label>
                </div>
                {errors.gender?.type === 'required' && <p className="text-danger"> *Please select gender</p>}
                <div className="row">
                    <div className="col">
                        <label htmlFor="email">Email Address {required}</label>
                        <input type="text"
                            name="userEmailId"
                            id="email"
                            className={`form-control mb-3 ${errors.email && "invalid border-danger"}`}
                            {...register('email', {
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                validate: {
                                    checkUrl: function checkEmailId(givenEmail) {
                                        fetch(URI+"/email=" + givenEmail + '/', {
                                            method: "POST",
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(givenEmail)
                                        }).then(
                                            (response) => {
                                                if (response.status === 409) {
                                                    document.getElementById("emailStatus").innerHTML = "User exists with given email address"
                                                    setEmailIsValid(false);
                                                } else if (response.status === 200) {
                                                    document.getElementById("emailStatus").innerHTML = ""
                                                    setEmailIsValid(true);
                                                }
                                            })
                                            .catch(
                                                function error(error) {
                                                    alert("Server did not respond. Email ID Validation failed."+error)
                                                })
                                    },
                                }
                            })} />
                        <p className="text-danger" id="emailStatus"></p>
                        {errors.email?.type === "required" && <p className="text-danger">Email is required</p>}
                        {errors.email?.type === "pattern" && <p className="text-danger">Please enter a valid Email Address</p>}

                    </div>
                    <div className="col">

                        <label htmlFor="password">Password {required}</label>
                        <input
                            type="password"
                            id="password"
                            className={`form-control mb-3 ${errors.password && "invalid border-danger"}`}
                            {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />

                        {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                        {errors.password?.type === "pattern" && <p className="text-danger">Minimum eight characters, at least one letter and one number</p>}

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="phoneNumber">Contact Number {required}</label>
                        <input type="text"
                            id="contactNumber"
                            className={`form-control mb-3 ${errors.contactNumber && "invalid border-danger"}`}
                            {...register('contactNumber', { required: true, pattern: /^[0-9-+()]+$/g })} />

                        {errors.contactNumber?.type === "required" && <p className="text-danger">Contact number is required</p>}
                        {errors.contactNumber?.type === "pattern" && <p className="text-danger">*Accepts only Numbers, hyphen(-), and round brackets ()</p>}

                    </div>
                    <div className="col">
                        <label htmlFor="userId">User ID {required}</label>
                        <input
                            type="text"
                            id="id"
                            className={`form-control mb-3 ${errors.id && "invalid border-danger"}`}
                            {...register('id', {
                                required: true,
                                pattern: /^[0-9]+$/g,
                                validate: {
                                    checkUrl: function checkEmailId(givenUserId) {
                                        fetch(URI+"/id=" + givenUserId + '/', {
                                            method: "POST",
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(givenUserId)
                                        }).then(
                                            (response) => {
                                                if (response.status === 409) {
                                                    document.getElementById("userIdValidation").innerHTML = "Users exists with given Id"
                                                    setIdIsValid(false);
                                                } else if (response.status === 200) {
                                                    document.getElementById("userIdValidation").innerHTML = ""
                                                    setIdIsValid(true);
                                                }
                                            })
                                            .catch(
                                                function error() {
                                                    alert("Server did not respond. User ID Validation failed.")
                                                }
                                            )
                                    },
                                }
                            })} />
                        <p className="text-danger" id="userIdValidation"></p>
                        {errors.id?.type === "required" && <p className="text-danger">User ID is required</p>}
                        {errors.id?.type === "pattern" && <p className="text-danger">*Accepts only numbers</p>}


                    </div>
                </div>


                <label htmlFor="category">Category {required}</label>
                <input readOnly type="text" id="cateogry" className="form-control mb-3" {...register('category')} value="user" />


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


                <button type="submit" id="registerBtn" className="btn btn-primary" disabled={(idisValid && emailIsValid) ? false : true}>Submit</button>&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>
            </form>
        </Fragment>
    )
}
export default UserRegistration;