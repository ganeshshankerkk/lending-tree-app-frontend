import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleRight } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
function AdminLogin() {
    const URI = "lending-tree.up.railway.app";
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const required = <span className="text-danger">*</span>
    const onRegistrationFormSubmit = (adminRecords) => {
    const givenId = adminRecords.id;
    const givenPassword = adminRecords.password;
    const givenLoginData = { givenId, givenPassword }
    fetch(URI+"/adminid=" + givenId + "/password=" + givenPassword +"/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(givenLoginData)
    })
        .then(
            function loginResponse(response) {
         
                if (response.status === 200) {
                    window.alert("Admin Login Successful")
                    history.replace("/admin/")
                    //dispatch(loginActions.persistUserRecords({givenLoginData}))
                    //dispatch(loginActions.loggedInState())
                } else if (response.status === 401) {
                    window.alert("The password that you entered is incorrect");
                } else if (response.status === 404) {
                    window.alert("Admin ID doesn't Exists");
                }
            })
        .catch(function error(err) {
            window.alert("Connection failed" + err)
        })
    }
    return (
        <Fragment>
 <form className="form-group col-lg-4 col-md-7 mx-auto px-3 py-3 bg-light mt-5" onSubmit={handleSubmit(onRegistrationFormSubmit)}>
                <div className="text-center bg-dark text-white pt-3 pb-3 mb-3">
                    <p className="display-5">Admin Login</p>
                    <p>Lending Tree Admin dashboard</p>
                </div>
                <label htmlFor="id">Admin ID {required}</label>
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

                <div className="d-grid gap-2 ">
                    <button type="submit" id="registerBtn" className="btn btn-primary mb-3">Login <FaArrowCircleRight/> </button>
                </div>
            </form>
        </Fragment>
    )
}
export default AdminLogin;