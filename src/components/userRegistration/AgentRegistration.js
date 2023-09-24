import { Fragment, useState } from "react"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AgentRegistration() {
    const URI = "lending-tree.up.railway.app";
    let history= useHistory();
    const [idisValid, setIdIsValid] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const required = <span className="text-danger">*</span>

    const onRegistrationFormSubmit = (agentRecords) => {
        fetch(URI+"/register/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agentRecords)
        }).then(
            function response() {
                window.alert(`New agent created successfully\nCategory : ${agentRecords.category}`)
                history.replace("/login");
            }
        ).catch(function error() {
            alert("Server failed to respond!")
        })
    }
    return (
        <Fragment>
            <form className="form-group col-lg-5 col-md-7 mb-5  mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(onRegistrationFormSubmit)}>

                <div className="text-center bg-dark text-white pt-3 pb-3">
                    <p className="display-5">Other User Registration</p>
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
                            name="email"
                            id="email"
                            className={`form-control mb-3 ${errors.email && "invalid border-danger"}`}
                            {...register('email', {
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                validate: {
                                    checkUrl: function checkEmailId(givenEmail) {
                                        fetch(URI+"/agentemail=" + givenEmail + '/', {
                                            method: "POST",
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(givenEmail)
                                        }).then(
                                            (response) => {
                                                if (response.status === 409) {
                                                    document.getElementById("emailValidation").innerHTML = "Agent exists with given email address";
                                                    setEmailIsValid(false);
                                                } else if (response.status === 200) {
                                                    document.getElementById("emailValidation").innerHTML = ""
                                                    setEmailIsValid(true);
                                                }
                                            })
                                            .catch(
                                                function error(error){
                                                alert(error)
                                                }
                                            )
                                    },
                                }
                            })} />
                        <p className="text-danger" id="emailValidation"></p>
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

                        <label htmlFor="agentId">Agent ID {required}</label>
                        <input
                            type="text"
                            id="agentId"
                            className={`form-control mb-3 ${errors.agentid && "invalid border-danger"}`}
                            {...register('id', {
                                required: true,
                                pattern: /^[0-9]+$/g,
                                validate: {
                                    checkUrl: function checkEmailId(givenagentId) {
                                        fetch(URI+"/agentid=" + givenagentId + '/', {
                                            method: "POST",
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(givenagentId)
                                        }).then(
                                            (response) => {
                                                if (response.status === 409) {
                                                    document.getElementById("agentIdValidation").innerHTML = "Agent exists with given Id";
                                                    setIdIsValid(false);
                                                } else if (response.status === 200) {
                                                    document.getElementById("agentIdValidation").innerHTML = ""
                                                    setIdIsValid(true);
                                                }
                                            })
                                            .catch(
                                                function error(error) { 
                                                   alert(error)
                                                    }
                                             
                                            )
                                    },
                                }
                            })} />
                        <p className="text-danger" id="agentIdValidation"></p>
                        {errors.id?.type === "required" && <p className="text-danger">Agent ID is required</p>}
                        {errors.id?.type === "pattern" && <p className="text-danger">*Accepts only numbers</p>}

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="category">Category {required}</label>
                        <select
                            className={`form-select mb-3 ${errors.category && "invalid border-danger"}`}
                            {...register("category", { required: true })}>
                            <option value=""></option>
                            <option value="approvalAgencyAgent">Approval Agency</option>
                            <option value="pickUp">Pick Up Agent</option>
                            <option value="personVerification">Person Verification Agent</option>
                            <option value="legalDepartment">Legal Department Agent</option>
                            <option value="loanAgencyAdmin">Loan Agency Admin</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.category?.type === "required" && <p className="text-danger">Category is required</p>}

                    </div>
                    <div className="col">
                        <label htmlFor="department">Department {required}</label>
                        
                        <input type="text"
                            id="department"
                            className={`form-control mb-3 ${errors.department && "invalid border-danger"}`}
                            {...register('department', { required: true, min : 4 })}

                        />
                        {errors.department?.type === "required" && <p className="text-danger">Department is required</p>}
                        {errors.department?.type === "min" && <p className="text-danger">Minimum 4 Characters Required</p>}


                    </div>
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


                <button type="submit" id="registerBtn" className="btn btn-primary" disabled={(idisValid && emailIsValid) ? false : true}>Submit</button>&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>
            </form>
        </Fragment>
    )
};
export default AgentRegistration;