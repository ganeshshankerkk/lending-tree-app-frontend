import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
function IndividualTicketStatus() {

    const filteredTicketRecords = useSelector(state => state.filterTicket.filteredTicketByUserId);

    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Ticket Status</h1>
            <div>
                <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5">

                    {filteredTicketRecords.map((filterTicketData) => (
                        <table className="table table-striped" key={filterTicketData.ticketid}>
                            <tbody>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>{filterTicketData.ticketid}</th>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{filterTicketData.date}</td>
                                </tr>
                                <tr>
                                    <th>User ID</th>
                                    <td>{filterTicketData.userid}</td>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <td>{filterTicketData.title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{filterTicketData.description}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td className="text-primary">{filterTicketData.status}</td>
                                </tr>
                                <tr>
                                    <th>Remarks</th>
                                    <td>{filterTicketData.remarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
            <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-dark"><Link className="text-decoration-none text-white" to="/ticket/status/"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                  
                </div>
        </Fragment>
    )
}
export default IndividualTicketStatus;