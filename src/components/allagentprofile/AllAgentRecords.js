import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiUser6Line } from 'react-icons/ri';
import DeleteAgentAccount from "./DeleteAgentAccount";
function AllAgentRecords() {
    const userid = useSelector(state => state.loginState.loggedAgentRecord.id);
    const [fullRecords, setUserRecords] = useState({});
    const URI = "https://lending-tree.up.railway.app";
    useEffect(() => {
        fetch(URI+'/userid=' + userid + "/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUserRecords(data);
            })
            .catch(function error(err) {
                console.error(err)
            })
    }, [userid])
    return (
        <Fragment>
            <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5">

                <p className="display-5 text-center text-light bg-dark py-3"> <RiUser6Line /> My Account</p>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Agent ID</th>
                            <th>{fullRecords.id}</th>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{fullRecords.firstName}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{fullRecords.lastName}</td>
                        </tr>
                        <tr>
                            <th>Department</th>
                            <td>{fullRecords.department}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{fullRecords.gender}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>{fullRecords.contactNumber}</td>
                        </tr>
                        <tr>
                            <th>Email Address</th>
                            <td>{fullRecords.email}</td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td>{fullRecords.password}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>{fullRecords.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <th>What's the name of the city where you were born?</th>
                            <td>{fullRecords.cityBornIn}</td>
                        </tr>

                        <tr>
                            <th>What was your childhood nickname?</th>
                            <td>{fullRecords.childhoodNickname}</td>
                        </tr>

                        <tr>
                            <th>What is the name of your favorite childhood friend?</th>
                            <td>{fullRecords.favoriteChildhoodFriend}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <DeleteAgentAccount/>
            </div>
        </Fragment>
    )
}
export default AllAgentRecords;