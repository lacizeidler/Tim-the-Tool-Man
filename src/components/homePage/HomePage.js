//! The responsibility of this module is to post the JSX to the dom. 
//! Should include the about me section, the services section, and the reviews section. 
//! Needs to include a button with a click event that links to the form page. 
import { useHistory } from "react-router"
import man from "../../img/man.jpg"
import tools from "../../img/tools.png"
import "./HomePage.css"

export const HomePage = () => {
    //* History keeps track of your urls that you've visited and directs the user there through a click event. At least in this application. 
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    return (
        <>
            <h2 className="about__me">About Me</h2>
            <div className="img__text">
                <img src={man} alt="man"></img>
                <p>Hi! My name is Tim! I am from a small town in Southern Illinois and I love everything home improvement. I have helped out a bunch of friends and family and over the years, have learned plumbing, electrical, installation, and much more. I figured I could bring my talents out to the public to help people with their projects, too. If you need my help, please click the button below to fill out a form. </p>
            </div>
            <div className="services" style={{backgroundImage: `url(${tools})`}}>
                <div className="services__list">
                <h2>Services</h2>
                <p>Through 10 years of experience, Tim is able to fix almost any type of home improvement problem.</p>
                <p>Busted pipe? Submit a Request. </p>
                <p>Need cabinets restored? Submit a request.  </p>
                <p>Ready for new flooring? Submit a request.  </p>
                </div>
                {
                    currentUser 
                    ? <button 
                    onClick={
                        () => {
                            history.push("/form")
                        }
                    }
                >Submit a Request</button>
                : <button 
                onClick={
                    () => {
                        history.push("/login")
                    }
                }
            >Sign In</button>
                }
            </div>
            <div>
                <h2 className="people__saying">What people are saying</h2>
                <div className="reviews">
                <div className="single__reviews">
                    <h4>Tammy Kincannon</h4>
                    <p>Had a sink installed in my bathroom and the work was superior. I couldn't see anything out of place. Would definitely recommend for any household work.</p>
                </div>
                <div className="single__reviews">
                    <h4>Bob Martin</h4>
                    <p>Tim was quick to fix my broken pipe underneath my sink. It was a real life savor since I don't know anything about plumbing. It was nice that he took the time out of his weekend to help me out.</p>
                </div>
                <div className="single__reviews">
                    <h4>Mary Hammonds</h4>
                    <p>Moved into a new house and Tim was able to hook up all my appliances and made the stress of moving a lot more bearable.</p>
                </div>
                </div>
            </div>
        </>
    )
}