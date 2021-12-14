//! The responsiblity of this module is to post the JSX to the dom. 
//! Should include the about me section, the services section, and the reviews section. 
//! Needs to include a button with a click event that links to the form page. 
import { useHistory } from "react-router"
import man from "../../img/man.jpg"
import tools from "../../img/tools.png"
import "./HomePage.css"

export const HomePage = () => {
    //* History keeps track of your urls that youve visited and directs the user there through a click event. At least in this application. 
    const history = useHistory()
    return (
        <>
            <h2 className="about__me">About Me</h2>
            <div className="img__text">
                <img src={man} alt="man"></img>
                <p>Hi! My name is Tim and I am somehow good at literally everything when it comes to home improvement. </p>
            </div>
            <div className="services" style={{backgroundImage: `url(${tools})`}}>
                <div className="services__list">
                <h2>Services</h2>
                <p>Through 10 years of experience, Tim is able to fix almost any type of home improvement problem.</p>
                <p>Busted pipe? Submit a Request. </p>
                <p>Need cabinets restored? Submit a request.  </p>
                <p>Ready for new flooring? Submit a request.  </p>
                </div>
                <button 
                    onClick={
                        () => {
                            history.push("/form")
                        }
                    }
                >Submit a Request</button>
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