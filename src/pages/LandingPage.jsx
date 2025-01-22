import { Link } from "react-router-dom";
import { svgs } from "../services/svg.service.jsx";
import boardImage from '../assets/images/board-image.png'


export function LandingPage(){

    const features = [
        'Projects',
        'Tasks',
        'Marketing',
        'Design',
        'CRM',
        'Software',
        'IT',
        'Operations',
        'Products',
    ]

    return (
        <section className="landing-page">
            <header className="landing-page-header">
                <h1>
                    <img style={{ width: '40px', height: '40px' }} src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="logo" />
                    mundane <span>.com</span>
                </h1>
                <Link to={'/board'}>Get started {svgs.arrowRightAlt}</Link>
            </header>

            <section className="landing-page-main">
                <h1>
                    <img style={{ width: '32px', height: '32px' }} src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="logo" />
                    mundane &nbsp;<span>work platform</span>
                </h1>

                <h2>Made for work, designed to love</h2>

                <h3>
                    Streamline workflows and gain clear visibility across
                    teams to make strategic decisions with confidence.
                </h3>

                <Link to={'/board'}>Get started {svgs.arrowRightAlt}</Link>

                <section className="landing-page-lower-container">
                    <section className="landing-page-features-container">
                        <h4>With us you can manage:</h4>
                        <section className="landing-page-features">
                            {features.map(feature => {
                                return (
                                    <section key={feature} className="feature-preview">
                                        <span>{svgs[`features${feature}`]}</span>
                                        <h4>{feature}</h4>
                                    </section>
                                )})
                            }
                        </section>
                    </section>
                    <img src={boardImage} alt="photo" />
                </section>
            </section>

        </section>
    )
}