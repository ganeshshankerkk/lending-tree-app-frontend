import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { adminLoginActions } from "../../store/adminloginSlice";
import { loadingActions } from "../../store/loadingSlice";
import { loginActions } from "../../store/loginSlice";
import './AgentLogin.css';
function AgentLogin() {
    const URI = "http://qr-code.ap-south-1.elasticbeanstalk.com";
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const required = <span className="text-danger">*</span>
    const loadingData = useSelector(state => state.loadingState.isLoading);
    let dispatch = useDispatch();
    const onLoginFormSubmit = (postUserRecords) => {
        const id = postUserRecords.id;
        const givenPassword = postUserRecords.password;
        const givenCategory = postUserRecords.category;
        const givenLoginData = {id,givenPassword,givenCategory}
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+"/agentid=" + id +"/password=" + givenPassword + "/category=" + givenCategory + "/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(givenLoginData)
        })
            .then(
                function loginResponse(response) {
                    dispatch(loadingActions.dataLoaded());
                    if (response.status === 200) {
                        window.alert("Login Successful")
                        dispatch(loginActions.agentLoggedInProfile())
                        switch(givenCategory) {
                            case "loanAgencyAdmin" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(loginActions.agencyAdminLoggedInState())
                                history.replace("/dashboard")
                                break;
                            }
                            case "admin" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(adminLoginActions.lendingTreeAdminLoggedIn())
                                history.replace("/dashboard")
                                break;
                            }
                            case "personVerification" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(loginActions.personVerificationDepartmentLoggedIn())
                                history.replace("/dashboard")
                                break;
                            }
                            case "approvalAgencyAgent" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(loginActions.approvalAgencyLoggedIn())
                                history.replace("/dashboard")
                                break;
                            }
                            case "pickUp" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(loginActions.pickUpLoggedIn())
                                history.replace("/dashboard")
                                break;
                            }
                            case "legalDepartment" : {
                                dispatch(loginActions.persistAgentsRecord({ givenLoginData }))
                                dispatch(loginActions.legalAgentLoggedIn())
                                history.replace("/dashboard")
                                break;
                            }
                            default : {
                                break;
                            }
                        }
                    } else if (response.status === 401) {
                        window.alert("The password that you entered is incorrect");
                    } else if (response.status === 403) {
                        window.alert(`Not a ${givenCategory} agent`);
                    }else if (response.status === 404) {
                        window.alert("Agent ID doesn't Exists");
                    }else if (response.status === 409) {
                        window.alert("Incorrect Password and Category");
                    }
                })
            .catch(function error(err) {
                window.alert("Connection failed" + err)
                dispatch(loadingActions.dataLoaded());
            })

    }
    return (
        <Fragment>
            <form className="form-group col-lg-4 col-md-7 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(onLoginFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3 mb-3">
                    <p className="display-5">Welcome Back!</p>
                    <p>Login to your Lending Tree dashboard</p>
                </div>
                <label htmlFor="id">ID {required}</label>
                <input type="number"
                    name="id"
                    id="email"
                    className={`form-control mb-3 ${errors.id && "invalid border-danger"}`}
                    {...register('id', {
                        required: true,
                        pattern: /^[0-9]+$/g,
                    })} />
                <p className="text-danger" id="emailStatus"></p>
                {errors.id?.type === "required" && <p className="text-danger">ID is required</p>}
                {errors.id?.type === "pattern" && <p className="text-danger">Please enter a valid ID</p>}


                <label htmlFor="password">Password {required}</label>
                <input
                    type="password"
                    id="password"
                    className={`form-control mb-3 ${errors.password && "invalid border-danger"}`}
                    {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />
                {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                {errors.password?.type === "pattern" && <p className="text-danger">Minimum eight characters, at least one letter and one number</p>}

                <label htmlFor="category">Category {required}</label>
                <select
                    className={`form-select mb-3 ${errors.category && "invalid border-danger"}`}
                    {...register("category", { required: true })}>
                            <option value=""></option>
                            <option value="approvalAgencyAgent">Approval Agency</option>
                            <option value="pickUp">Pick Up</option>
                            <option value="personVerification">Person Verification Agent</option>
                            <option value="legalDepartment">Legal Department</option>
                            <option value="loanAgencyAdmin">Loan Agency Admin</option>
                            <option value="admin">Admin</option>
                </select>
                {errors.category?.type === "required" && <p className="text-danger">Category is required</p>}
                <div className="d-grid gap-2 ">
                    <button type="submit" id="registerBtn" className="btn btn-primary mb-3">Login <FaArrowCircleRight/> </button>
                </div>
                <div className="paragraph text-center">
                    <Link to="/recover/id/agent" className="link-primary text-decoration-none"><p>Forgot your ID?</p></Link>
                    <Link to="/recover/password/agent" className="link-primary text-decoration-none"><p>Forgot your password?</p></Link>
                    New to LendingTree? <Link to="/register" className="link-primary text-decoration-none">Creat an account.</Link>
                </div>
            </form>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
        </Fragment>
    )
}
export default AgentLogin;