import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import customerservice from '../images/customerservice.jpeg';
import nocreditscore from '../images/nocreditscore.jpg';
import interestrate from '../images/interestrate.jpg';
function HomePage () {
    const link = "text-decoration-none text-dark";
    return(
        <Fragment>
               <div className="jumbotron justify-content-center text-center bg-light pt-5 pb-5 text-dark">
                <div className="row"> 
                    <div className = "col-sm-6  mx-auto"> 
                        <p className= "display-5" >Simple, & hassle-free Personal Loan</p>
                        <p> A Loan is a stepping stone in realizing one's dream. We help you in taking that one step closer towards your dream with our 
                        customer friendly Loan products.Through our years of expertise and experience we guide our customers by giving them the right advice. 
                        Ready to take the next step?</p>       
                        <button className="btn btn-warning btn-lg"> <NavLink to='/register' className={link}>Register Now</NavLink></button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row"> 
                    <div className = "col-sm-4 mt-4"> 
                          <img src={interestrate} className="img-thumbnail" alt="head1"/>
                        <p className= "display-6 mt-2" >Lowest Possible Interest Rate</p>
                        <p>Get attractive interest rates as low as 7.5% onwards on your personal loan</p>
                  
                    </div>
                     <div className = "col-sm-4 mt-4"> 
                       <img src={nocreditscore} className="img-thumbnail"alt="head2"/>
                        <p className= "display-6 mt-2" >No credit history required</p>
                        <p>No credit history? No problem. Get a loan from us even if you have never taken one before.</p>
                  
                    </div>
                     <div className = "col-sm-4 mt-4"> 
                       <img className="img-thumbnail" src={customerservice} alt="head3"/>
                        <p className= "display-6 mt-2" >Effective Customer Service</p>
                        <p>To ensure a hassle free experience with minimal personal loan documentation and quick turnaround time.</p>
                  
                    </div>
                </div>
            </div>
            <div className="jumbotron justify-content-center text-center bg-primary mb-4 mt-5 pt-5 pb-5 text-white">
                <div className="row"> 
                    <div className = "col-sm-6  mx-auto"> 
                        <h4>Services</h4>
                        <p className="font-weight-bold"> 
                        Lending Tree offers you a suite of financial services to help you reach closer to your goals. From your ideal 
                        home to the finances you need to set up your own business, we will provide you with loans that are hassle-free, 
                        customisable and tailored to your needs. We are not just another financial services company, 
                        you can Count On Us as your partner for life.
                        </p>       
                        {/* <button className="btn btn-outline-light btn-lg"> Know More</button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default HomePage;