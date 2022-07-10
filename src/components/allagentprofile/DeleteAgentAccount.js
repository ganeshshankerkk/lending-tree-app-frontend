import { Fragment } from "react";
import { ImBin } from 'react-icons/im';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginActions } from "../../store/loginSlice";

function DeleteAgentAccount() {
    let history = useHistory();
    let dispatch = useDispatch();
    const agentid = useSelector(state => state.loginState.loggedAgentRecord.id);
  
    function deleteAgentHandler() {
        let response = window.confirm("This action cannot be undone. Are you sure you want to permanently delete your account?")
        if (response) {
            fetch("http://localhost:8897/deleteuser=" + agentid + "/", {
                method: "DELETE",
            }).then(
                () => {
                    window.alert("Account deleted successfully!")
                    history.replace("/");
                    dispatch(loginActions.approvalAgencyLoggedOut())
                }
            ).catch(function error(error) {
                    window.alert(error)
                })
        } else {
            return;
        }
    }

    return (
        <Fragment>
            <button type="button" onClick={deleteAgentHandler} className="btn btn-danger btn-md mb-5"><ImBin /> Permanently Delete My Account</button>
        </Fragment>
    )
}
export default DeleteAgentAccount;