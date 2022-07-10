import { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserRegistration from "../components/userRegistration/UserRegistration";
import AgentRegistration from "../components/userRegistration/AgentRegistration";
import { toggleFormActions } from "../store/toggleFormSlice";

function Registration() {
    const dispatch = useDispatch();

    const toggleRegistration = useSelector(state => state.toggleRegistrationForm.userRegistration);


    function toggleUserRegistration() {
        dispatch(toggleFormActions.toggleUserRegistrationForm());
    }
    function toggleAgentRegistration() {
        dispatch(toggleFormActions.toggleAgentRegistrationForm());
    }
    return (
        <Fragment>
            <div className="text-center">
                <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="toggle" onClick={toggleUserRegistration} defaultChecked /> User Registration
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="toggle" onClick={toggleAgentRegistration} /> Other user
                    </label>
                </div>
            </div>
            {toggleRegistration && <UserRegistration />}
            {!toggleRegistration && <AgentRegistration />}

        </Fragment>
    )
}
export default Registration;