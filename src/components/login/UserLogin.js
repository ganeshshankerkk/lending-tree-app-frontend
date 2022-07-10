import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loadingActions } from "../../store/loadingSlice";
import { loginActions } from "../../store/loginSlice";
function UserLogin() {
    let history = useHistory();
    let dispatch = useDispatch();

    const loadingData = useSelector(state => state.loadingState.isLoading);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const required = <span className="text-danger">*</span>

    const onLoginFormSubmit = (postUserRecords) => {

        const givenId = postUserRecords.id;
        const givenPassword = postUserRecords.password;
        const givenLoginData = { givenId, givenPassword }
        dispatch(loadingActions.dataIsLoading());
        fetch("http://localhost:8897/userid=" + givenId + "/userpassword=" + givenPassword + "/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(givenLoginData)
        }).then(
                function loginResponse(response) {
                    dispatch(loadingActions.dataLoaded());
                    if (response.status === 200) {
                        window.alert("Login Successful")
                        history.replace("/dashboard")
                        dispatch(loginActions.persistUserRecords({ givenLoginData }))
                        dispatch(loginActions.loggedInState())
                    } else if (response.status === 401) {
                        window.alert("The password that you entered is incorrect");
                    } else if (response.status === 404) {
                        window.alert("User ID doesn't Exists");
                    }
                })
            .catch(function error() {
                window.alert("Connection failed")
                dispatch(loadingActions.dataLoaded());
            })

    }
    return (
        <Fragment>
            <form className="form-group col-lg-4 col-md-7 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(onLoginFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3 mb-3">
                    <p className="display-5">Welcome Back!</p>
                    <p>Login to your Lending Tree User dashboard</p>
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
                {errors.id?.type === "required" && <p className="text-danger">User ID is required</p>}
                {errors.id?.type === "pattern" && <p className="text-danger">Please enter a valid User ID</p>}


                <label htmlFor="password">Password {required}</label>
                <input
                    type="password"
                    id="password"
                    className={`form-control mb-3 ${errors.password && "invalid border-danger"}`}
                    {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />
                {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                {errors.password?.type === "pattern" && <p className="text-danger">Minimum eight characters, at least one letter and one number</p>}

                <div className="d-grid gap-2">
                    <button type="submit" id="registerBtn" className="btn btn-primary mb-3">Login <FaArrowCircleRight /> </button>
                </div>
                <div className="paragraph text-center">
                <Link to="/recover/id/user" className="link-primary text-decoration-none"><p>Forgot your ID?</p></Link>
                    <Link to="/recover/password/user" className="link-primary text-decoration-none"><p>Forgot your password?</p></Link>
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
export default UserLogin;