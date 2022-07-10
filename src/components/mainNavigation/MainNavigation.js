import { Fragment } from "react";
import { RiUser6Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";


import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { adminLoginActions } from "../../store/adminloginSlice";
import { loginActions } from "../../store/loginSlice";
import './MainNavigation.css'
function MainNavigation() {
    const URI = "/";
    let history = useHistory();
    const userLoggedIn = useSelector(state => state.loginState.isLoggedIn)
    const approvalAgencyLoggedIn = useSelector(state => state.loginState.isAgencyLogggedIn)
    const agencyAdminLoggedIn = useSelector(state => state.loginState.isAdminLoggedIn)
    const agentLoggedInProfilePage = useSelector(state => state.loginState.agentLoggedInProfile);
    const pickUpAgentSignedIn = useSelector(state => state.loginState.pickUpAgentLoggedIn);
    const personVerificationAgentLoggedIn = useSelector(state => state.loginState.personVerificationAgentLoggedIn);
    const legalVerificationAgentLoggedIn = useSelector(state => state.loginState.isLegalAgentLoggedIn);
    const lendingTreeAdminLogIn = useSelector(state => state.adminLoginState.isLendingTreeAdminLoggedIn);

    const link = "navLink";
    let dispatch = useDispatch();

    function logoutHandler() {
        if (userLoggedIn) {
            dispatch(loginActions.logoutSate());
            history.replace(URI);
        }
        if (approvalAgencyLoggedIn) {
            dispatch(loginActions.approvalAgencyLoggedOut());
            history.replace(URI);
        }
        if (agentLoggedInProfilePage) {
            dispatch(loginActions.agentLoggedOutProfile());
            history.replace(URI);
        }
        if (agencyAdminLoggedIn) {
            dispatch(loginActions.agencyAdminLoggedOutState())
            history.replace(URI);
        }
        if (pickUpAgentSignedIn) {
            dispatch(loginActions.pickupLoggedOut())
            history.replace(URI);
        }
        if (personVerificationAgentLoggedIn) {
            dispatch(loginActions.personVerificationDepartmentLoggedOut())
            history.replace(URI);
        }
        if (legalVerificationAgentLoggedIn) {
            dispatch(loginActions.legalAgentLoggedOut())
            history.replace(URI);
        }
        if (lendingTreeAdminLogIn) {
            dispatch(adminLoginActions.lendingTreeAdminLoggedOut())
            history.replace(URI);
        }
    }
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-3">
                    <div className="navbar-collapse collapse w-100 order-1 order-sm-0 dual-collapse2">
                        <ul className="navbar-nav mr-auto mx-5">
                            <li className="nav-item active">
                                <NavLink className="navbar-brand" to={URI} ><FaRupeeSign/> Lending Tree</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 justify-content-end">
                        <ul className="nav  ml-auto mx-5">
                            {/* LOGIN */}
                            {!userLoggedIn && !approvalAgencyLoggedIn && !agencyAdminLoggedIn &&
                                !pickUpAgentSignedIn && !personVerificationAgentLoggedIn && !lendingTreeAdminLogIn && !legalVerificationAgentLoggedIn &&
                                <li className="nav-item">
                                    <NavLink variant="pills" activeclassname="navActive" to='/login' className={link}><RiUser6Line/> Login</NavLink>
                                </li>}
                            {/* DASHBOARD */}
                            {(userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn || legalVerificationAgentLoggedIn || lendingTreeAdminLogIn) &&
                                <li className="nav-item">
                                    <NavLink activeclassname="navActive" to='/dashboard' className={link}><GiHamburgerMenu /> Dashboard</NavLink>
                                </li>}
                            {/* MY ACCOUNT */}
                            {(agentLoggedInProfilePage || userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn || legalVerificationAgentLoggedIn || lendingTreeAdminLogIn) &&
                                <li className="nav-item">
                                    <NavLink activeclassname="navActive" to='/profile' className={link}> <RiUser6Line /> My Account</NavLink>
                                </li>}
                            {/* CONTACT */}
                            <NavLink activeclassname="navActive" to='/contact' className={link}> <BiSupport /> Contact</NavLink>
                            {/* LOGOUT */}
                            {(userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn
                                || legalVerificationAgentLoggedIn ||
                                lendingTreeAdminLogIn) &&
                                <li className="nav-item">
                                    <button className="btn btn-warning" onClick={logoutHandler}>Logout</button>
                                </li>}
                        </ul>
                    </div>
                </nav>
            </header>
        </Fragment>
    )
}
export default MainNavigation;