import { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AgentLogin from "../components/login/AgentLogin";
import UserLogin from "../components/login/UserLogin";
import { toggleFormActions } from "../store/toggleFormSlice";

function Login() {
    const dispatch = useDispatch();

    const toggleLogin = useSelector(state => state.toggleRegistrationForm.userLogin);


    function toggleUserLogin() {
        dispatch(toggleFormActions.toggleUserLogin());
    }
    function toggleAgentLogin() {
        dispatch(toggleFormActions.toggleAgentLogin());
    }
    return (
        <Fragment>
            <div className="text-center">
                <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="toggle" onClick={toggleUserLogin} defaultChecked /> User Login
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="toggle" onClick={toggleAgentLogin} /> Other user
                    </label>
                </div>
            </div>
            {toggleLogin && <UserLogin />}
            {!toggleLogin && <AgentLogin />}
        </Fragment>
    )
}
export default Login;