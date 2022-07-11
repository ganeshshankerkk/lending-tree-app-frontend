import { Fragment } from "react";
import { NavLink } from "react-router-dom";
function About() {
  const link = "text-decoration-none text-dark";
  return (
    <Fragment>
      <div className="jumbotron justify-content-center bg-light pt-5 pb-5 text-dark">
        <div className="row">
          <div className="col-sm-8 text-center mx-auto">
            <p className="display-5" >About Lending Tree</p>
          </div>
        </div>
        <div className="row col-sm-4 mx-auto text-center w-50 my-3">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-success btn-sm mx-1">Java Spring Boot</button>
            <button type="button" className="btn btn-success btn-sm mx-1">MySQL</button>
            <button type="button" className="btn btn-success btn-sm mx-1">React JS</button>
            <button type="button" className="btn btn-success btn-sm mx-1">Bootstrap</button>
          </div>
        </div>
        <div className="mx-auto col-sm-8">
          <p>
            <ol className="list-group">
              <li className="list-group-item">Lending tree facilitates the customer (user) to apply for loans from the user dashboard and to track the status (pending/processing/approved/rejected) at any point of time</li>
              <li className="list-group-item">Customer can also raise a help ticket in case of any doubts/clarifications which is then resolved by the lending tree admin</li>
              <li className="list-group-item">New loan requests goes through a series of stages before approval (starting from approval agency approval to legal verification department agent approval)</li>
              <li className="list-group-item">Once all approval procedures are completed, loan agency admin marks the status of the loan as 'approved'. Customers can track the status of loan request from their dashboard (pending/approved/rejected)</li>
              <li className="list-group-item">After a loan request is approved, feedback request is automatically triggered to the customer in their next login</li>
            </ol>
          </p>
          <div className="text-center mx-auto">
            <p className="display-5" >Complete Work flow</p>
            <div className="embed-responsive embed-responsive-21by9">
              <iframe align="center" className="embed-responsive-item" src="https://drive.google.com/file/d/1knFhvmDKsu6yWqeCib-gEL1wjDbCQkFT/preview" title="Lending Tree app Work flow diagram" allowfullscreen ></iframe>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center col-sm-6 my-5">
          <button className="btn btn-warning btn-lg"> <NavLink to='/register' className={link}>Register Now</NavLink></button>
        </div>
      </div>
    </Fragment>

  )
}
export default About;