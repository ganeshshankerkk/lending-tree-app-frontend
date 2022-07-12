import { Fragment, useState } from "react";
import { RiUser6Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
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
    const [hamburgerMenuIcon, setHamburgerMenuIcon] = useState(false);
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
                <nav className="main-nav">
                    <div className="logo">
                        <NavLink activeclassname="navActive" className={link} to={URI} ><FaRupeeSign />Lending Tree</NavLink>
                    </div>
                    <div className="hamburger-menu">
                    {/* <NavLink activeclassname="navActive" onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} className="hamburger-icon" ><GiHamburgerMenu /></NavLink> */}
                        <a href="#" onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)}>
                            <GiHamburgerMenu />
                        </a>
                    </div>
                    <div className={hamburgerMenuIcon ? "menu-link mobile-menu-link" : "menu-link"}>
                        <ul>
                            {/* About */}
                            <NavLink  onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} activeclassname="navActive" to='/about' className={link}> <FaHandsHelping /> About</NavLink>
                            {/* LOGIN */}
                            {!userLoggedIn && !approvalAgencyLoggedIn && !agencyAdminLoggedIn &&
                                !pickUpAgentSignedIn && !personVerificationAgentLoggedIn && !lendingTreeAdminLogIn && !legalVerificationAgentLoggedIn &&
                                <NavLink onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} variant="pills" activeclassname="navActive" to='/login' className={link}><RiUser6Line /> Login</NavLink>
                            }
                            {/* DASHBOARD */}
                            {(userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn || legalVerificationAgentLoggedIn || lendingTreeAdminLogIn) &&
                                <NavLink  onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} activeclassname="navActive" to='/dashboard' className={link}><GiHamburgerMenu /> Dashboard</NavLink>
                            }
                            {/* MY ACCOUNT */}
                            {(agentLoggedInProfilePage || userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn || legalVerificationAgentLoggedIn || lendingTreeAdminLogIn) &&
                                <NavLink  onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} activeclassname="navActive" to='/profile' className={link}> <RiUser6Line /> My Account</NavLink>
                            }
                            {/* CONTACT */}
                            <NavLink  onClick={() => setHamburgerMenuIcon(!hamburgerMenuIcon)} activeclassname="navActive" to='/contact' className={link}> <BiSupport /> Contact</NavLink>
                            {/* LOGOUT */}
                            {(userLoggedIn || approvalAgencyLoggedIn || agencyAdminLoggedIn || pickUpAgentSignedIn
                                || personVerificationAgentLoggedIn
                                || legalVerificationAgentLoggedIn ||
                                lendingTreeAdminLogIn) &&
                                <button className="btn btn-warning" onClick={logoutHandler}>Logout</button>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </Fragment>
    )
}
export default MainNavigation;
