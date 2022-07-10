import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Fragment } from "react";
import { loadingActions } from "../../../store/loadingSlice";
import { filterTicketDataActions } from "../../../store/filterTicketDataSlice";

function AllResolvedTickets() {
    const URI = "https://lending-tree-app.herokuapp.com";
    const dispatch = useDispatch();
    let [ticketCount, setTicketCount] = useState(false);
    const [resolvedTickets, setResolvedTickets] = useState([]);
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2','#F6D6F6','#DCEBFF','#FFF2E2','#F5E5E4','#FAF5EF','#ECECEC'];
    const loadingData = useSelector(state => state.loadingState.isLoading);
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/resolved-tickets/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const ticketRecordsDetail = data.map(ticketDetails => {
                    return {
                        ticketid: ticketDetails.ticketid,
                        date: ticketDetails.date,
                        description: ticketDetails.description,
                        userid: ticketDetails.userid,
                        title: ticketDetails.title,
                        status: ticketDetails.status,
                        remarks: ticketDetails.remarks,
                    }
                })
                setResolvedTickets(ticketRecordsDetail);
                if (ticketRecordsDetail.length === 0) {
                    setTicketCount(false)
                } else if (ticketRecordsDetail.length > 0) {
                    setTicketCount(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch])

    function filterTickets(ticketId) {
        let filterTicketData = resolvedTickets.filter(function (ticketRecords) {
            return ticketRecords.ticketid === ticketId;
        }).map(function ({ ticketid, userid, title, description,
            date, status, remarks },) {
            return {
                ticketid, userid, title, description,
                date, status, remarks,
            };
        })
        dispatch(filterTicketDataActions.individualTicketRecords({ filterTicketData }));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-6 text-center">Resolved Tickets</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !ticketCount && <p className="text-center text-danger mt-3">No resolved tickets!</p>}
            {ticketCount && <div className="row mx-auto">
                {resolvedTickets.map((ticket,backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={ticket.ticketid} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor}>
                                <h5 className="card-title" key={ticket.ticketid}>Ticket ID : {ticket.ticketid}</h5>
                                <p className="card-text">User ID : {ticket.userid}</p>
                                <p className="card-text">Title : {ticket.title}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => filterTickets(ticket.ticketid)}>
                                            <Link className="text-decoration-none text-dark" to={`/resolved-tickets/${ticket.ticketid}`}><BsCardList /> Details</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </Fragment>
    )
}
export default AllResolvedTickets;