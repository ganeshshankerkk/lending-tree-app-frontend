import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { loadingActions } from "../../store/loadingSlice";
import { filterTicketActions } from "../../store/filterTicketSlice";
function SupportTicketStatus() {
    const URI = "https://lending-tree-web-app.herokuapp.com";
    const dispatch = useDispatch();
    let [ticketCount, setTicketCount] = useState(false);
    const [pendingTickets, setPendingTickets] = useState([]);
    const loadingData = useSelector(state => state.loadingState.isLoading);
    const userid = useSelector(state => state.loginState.loggedUserRecords.givenId);
    const bgColor = ['#Ffe6e2', '#Dbf6fe', '#Feeaf1', '#f0f1f2', '#F6D6F6', '#DCEBFF', '#FFF2E2', '#F5E5E4', '#FAF5EF', '#ECECEC'];
    useEffect(() => {
        dispatch(loadingActions.dataIsLoading());
        fetch(URI+'/ticket/userid=' + userid + '/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const ticketRecords = data.map(ticketDetails => {
                    return {
                        ticketid: ticketDetails.ticketid,
                        title: ticketDetails.title,
                        userid: ticketDetails.userid,
                        description: ticketDetails.description,
                        date: ticketDetails.date,
                        status: ticketDetails.status,
                        remarks: ticketDetails.remarks,
                    }
                });
                setPendingTickets(ticketRecords);
                if (ticketRecords.length === 0) {
                    setTicketCount(false)
                } else if (ticketRecords.length > 0) {
                    setTicketCount(true);
                }
                dispatch(loadingActions.dataLoaded());
            })
            .catch(function error(error) {
                window.alert("Failed to fetch." + error)
            })

    }, [dispatch, userid])


    function ticketDetails(ticketId) {
        let filteredTicketData = pendingTickets.filter(function (ticketDetails) {
            return ticketDetails.ticketid === ticketId;
        }).map(function ({ ticketid, userid, title, description,
            date, status, remarks },) {
            return {
                ticketid, userid, title, description,
                date, status, remarks
            };
        })
        dispatch(filterTicketActions.individualTicketRecords({ filteredTicketData }));
    }
    return (
        <Fragment>
            <h1 className="bg-dark mt-4 text-light pt-3 pb-3 display-5 text-center">Ticket Status</h1>
            {loadingData && <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                </div>
            </div>}
            {!loadingData && !ticketCount && <p className="text-center text-danger mt-3">No pending tickets!</p>}
            {ticketCount && <div className="row mx-auto">
                {pendingTickets.map((ticket, backgroundColor) => (
                    <div className="col-lg-3 col-md col-sm-12 ms-3 mr-3 mt-3" key={ticket.ticketid} style={{ width: '28rem' }}>
                        <div className="card mb-3">
                            <div className="card-body" style={{ backgroundColor: bgColor[backgroundColor] }} key={backgroundColor} >
                                <h5 className="card-title" key={ticket.ticketid}>Ticket ID : {ticket.ticketid}</h5>
                                <p className="card-text">Title : {ticket.title}</p>
                                <p className="card-text">Date : {ticket.date}</p>
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-2" role="group">
                                        <button className="btn btn-info" onClick={() => ticketDetails(ticket.ticketid)}>
                                            <Link className="text-decoration-none text-dark" to={`/ticket/status/${ticket.ticketid}`}><BsCardList /> View Status</Link>
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
export default SupportTicketStatus;