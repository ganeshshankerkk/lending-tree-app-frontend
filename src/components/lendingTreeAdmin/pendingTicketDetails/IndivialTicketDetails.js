import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GiTicket } from "react-icons/gi";
import { ImArrowLeft2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { MdDone } from "react-icons/md";
import { loadingActions } from "../../../store/loadingSlice";
function IndivialTicketDetails() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    let dispatch = useDispatch();
    const [isResolvingTicket, setIsResolvingTicket] = useState(false);
    const ticketRecords = useSelector(state => state.filterTicketData.filteredTicketDetails);
    const required = <span className="text-danger">*</span>
    const loadingData = useSelector(state => state.loadingState.isLoading);

    function resolveAndCloseTicket(ticketRemarks) {
        let remarks = ticketRemarks.remarks;
        const ticketId = ticketRecords.map((ticketDetails) => {
            return ticketDetails.ticketid;
        })
        let response = { ticketId, remarks }
        dispatch(loadingActions.dataIsLoading());
        fetch("http://localhost:8897/resolve/ticketid=" + ticketId + "/remarks=" + remarks + "/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(
            function response() {
                dispatch(loadingActions.dataLoaded());
                window.alert("Ticket resolved")
                history.replace("/pending-tickets")
            }
        ).catch(function error() {
            alert("Server failed to respond!")
            dispatch(loadingActions.dataLoaded());
        })
    }

    function resolveTicket() {
        setIsResolvingTicket(true)
    }

    function cancelResolvingRequest() {
        setIsResolvingTicket(false)
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-6 text-center">{isResolvingTicket ? 'Resolve Ticket' : 'Pending Ticket Details'}</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            { !isResolvingTicket && <div>
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
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="btn-toolbar text-center justify-content-center" role="toolbar">
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-dark"><Link className="text-decoration-none text-white" to="/pending-tickets/"><ImArrowLeft2 /> Back</Link></button> &nbsp;
                    </div>
                    <div className="btn-group me-2 mb-2" role="group">
                        <button className="btn btn-success" onClick={resolveTicket}><GiTicket/> Resolve Ticket</button> &nbsp;
                    </div>
                </div>
            </div>}
            <div>
                {isResolvingTicket && 
                
                <form className="form-group col-lg-4 col-md-7 mt-4 mx-auto px-3 py-3 bg-light" onSubmit={handleSubmit(resolveAndCloseTicket)}>
                    <label htmlFor="rejectionReason">Remarks {required}</label>
                    <textarea
                        type="text"
                        id="remarks"
                        rows="4"
                        placeholder="Provide resolution to the query"
                        className={`form-control mt-3 mb-3 ${errors.remarks && "invalid border-danger"}`}
                        {...register('remarks', { required: true })} />
                    {errors.remarks?.type === "required" && <p className="text-danger">Remarks is required</p>}
                    <div className="float-end">
                        <div className="btn-group me-2 mb-2" role="group">
                            <button type="button" className="btn btn-dark" onClick={cancelResolvingRequest}><ImArrowLeft2 /> Back</button> &nbsp;
                            <button type="submit" className="btn btn-success">Resolve <MdDone /></button> &nbsp;
                        </div>
                    </div>
                </form>}
            </div>


        </Fragment>
    )
}
export default IndivialTicketDetails;