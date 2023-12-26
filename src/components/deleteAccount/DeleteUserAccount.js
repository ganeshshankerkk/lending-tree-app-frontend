import { Fragment } from "react";
import { ImBin } from 'react-icons/im';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginActions } from "../../store/loginSlice";

function DeleteUserAccount() {
    const URI = "http://qr-code.ap-south-1.elasticbeanstalk.com";
    let history = useHistory();
    let dispatch = useDispatch();
    const userid = useSelector(state => state.loginState.loggedUserRecords.givenId);
  
    function deleteUserHandler() {
        let response = window.confirm("This action cannot be undone. Are you sure you want to permanently delete your account?")
        if (response) {
            fetch(URI+"/deleteuser=" + userid + "/", {
                method: "DELETE",
            }).then(
                () => {
                    window.alert("Account deleted successfully!")
                    history.replace("/");
                    dispatch(loginActions.logoutSate());
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
            <button type="button" onClick={deleteUserHandler} className="btn btn-danger btn-md mb-5"><ImBin /> Permanently Delete My Account</button>
        </Fragment>
    )
}
export default DeleteUserAccount;