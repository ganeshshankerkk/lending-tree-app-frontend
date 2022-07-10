import { Fragment } from "react";
import email from '../images/email.png';
import phone from '../images/phone.png';
import location from '../images/location.png';
function Contact() {
    return (
        <Fragment>
            <div className="px-4  my-5 text-center">
                <h1 className="display-6 fw-bold">Contact Us</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">We'd love to hear from you!</p>
                </div>
            </div>


            <div className="row mx-auto text-center w-75 text-secondary  bg-light pt-5 pb-5 ps-5 pe-5">
                <div className="col-lg-4">
                <img src={phone} height="150px" width="150px" alt="phone"/>
                    <h5 className="text-dark">RING US</h5>
                    <p>1812 656 4535</p>
                    <p>Between 9 AM to 6 PM</p>
                    <p>Monday to Saturday</p>
                    <p>(Closed On Sundays And Public Holidays)</p>
                </div>
                <div className="col-lg-4">
                <img src={email} height="150px" width="150px" alt="email"/>
                    <h5 className="text-dark">EMAIL US</h5>
                    <p>Need a Loan?</p>
                    <p>Write to us at:</p>
                    <p>contact@lendingtree.com</p>
                    <p>agentsupport@lendingtree.com</p>
                </div>
                <div className="col-lg-4 ">
                    <img src={location} height="150px" width="150px" alt="location"/>
                    <h5 className="text-dark">FIND US</h5>
                    <p>Visit our branch and talk to our lending expert today.</p>
                    <p>15th Floor, Tower B, IT Park</p>
                    <p>Kochi, Kerala</p>
                    <p>670001</p>
                </div>
            </div>

        </Fragment>
    )
}
export default Contact;