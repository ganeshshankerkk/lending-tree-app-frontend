import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
function InidiviualResolvedTickets() {
    const ticketRecords = useSelector(state => state.filterTicketData.filteredTicketDetails);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-6 text-center">Approved Ticket Details</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            <div>
                <div className="table-responsive mx-auto col-lg-5 col-md-7 mt-5">
                    {ticketRecords.map((ticket) => (
                        <table className="table table-striped" key={ticket.ticketid}>
                            <tbody>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>{ticket.ticketid}</th>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{ticket.date}</td>
                                </tr>
                                <tr>
                                    <th>Requested User ID</th>
                                    <td>{ticket.userid}</td>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <td>{ticket.title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{ticket.description}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{ticket.status}</td>
                                </tr>
                                <tr>
                                    <th>Remarks</th>
                                    <td>{ticket.remarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-info"><Link className="text-decoration-none text-white" to="/resolved-tickets/"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InidiviualResolvedTickets;