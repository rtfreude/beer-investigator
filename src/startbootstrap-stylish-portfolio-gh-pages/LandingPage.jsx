import React, { Component } from 'react';
import { Link } from 'react-router'
import $ from 'jquery'


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        console.log('clicked')
    }


render() {
    return (
<div>
    <a id="menu-toggle" href="#" className="btn btn-dark btn-lg toggle" onClick={this.handleClick}><i className="fa fa-bars" ></i></a>
    <nav id="sidebar-wrapper">
        <ul className="sidebar-nav">
            <a id="menu-close" href="#" className="btn btn-light btn-lg pull-right toggle" onClick={this.handleClick}><i className="fa fa-times"></i></a>
            <li className="sidebar-brand">
                <Link to="/">Beer Investigator</Link>
            </li>
            <li>
                <Link to="/brewerysearch">Locate Breweries</Link>
            </li>
            <li>
                <Link to="/breweryinfo">Investigate Brewery</Link>
            </li>
            <li>
                <Link to="/beerinfo">Investigate Beer</Link>
            </li>
            <li>
                <a href="#services" onClick={this.handleClick}>Services</a>
            </li>
            <li>
                <a href="#contact" onClick={this.handleClick}>Contact</a>
            </li>
        </ul>
    </nav>



    <header id="top" className="header">
        <div className="text-vertical-center">
            <div className="landing-highlight">
                <h1 style={{color: "rgb(255, 248, 174)"}}>Beer Investigator</h1>
                <h3 style={{color: "rgb(255, 255, 255)"}}>Research and locate your favorite breweries and beer!</h3>
                <br />
                {/*<a href="#about" className="btn btn-dark btn-lg">Find Out More</a>*/}
                <a href="#" className="btn btn-lg btn-light land-btn">Login!</a>
                <a href="#" className="btn btn-lg btn-light land-btn">Register Now!</a>
            </div>
        </div>
    </header>

{/*
    <section id="about" className="about">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>Stylish Portfolio is the perfect theme for your next project!</h2>
                    <p className="lead">This theme features some wonderful photography courtesy of <a target="_blank" href="http://join.deathtothestockphoto.com/">Death to the Stock Photo</a>.</p>
                </div>
            </div>

        </div>

    </section>
*/}

    <section id="services" className="services bg-primary land-container">
        <div className="container">
            <div className="row text-center">
                <div className="col-lg-10 col-lg-offset-1">
                    <h2>Our Services</h2>
                    <hr className="small" />
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="service-item">
                                <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-beer fa-stack-1x text-primary"></i>
                            </span>
                                <h4>
                                    <strong>Investigate Beer</strong>
                                </h4>
                                <p>Reaserch and learn about your favorite beers by browsing our library of over 60000 beers!</p>
                                <a href="#" className="btn btn-light">Learn More</a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="service-item">
                                <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-home fa-stack-1x text-primary"></i>
                            </span>
                                <h4>
                                    <strong>Investigate Breweries</strong>
                                </h4>
                                <p>Search for breweries from around the world to learn about their history and the beer the make.</p>
                                <a href="#" className="btn btn-light">Learn More</a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="service-item">
                                <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-binoculars fa-stack-1x text-primary"></i>
                            </span>
                                <h4>
                                    <strong>Locate Breweries</strong>
                                </h4>
                                <p>Quickly find breweries around the world by searching our massive brewery database.</p>
                                <a href="#" className="btn btn-light">Learn More</a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="service-item">
                                <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-bar-chart fa-stack-1x text-primary"></i>
                            </span>
                                <h4>
                                    <strong>Beer Tracker</strong>
                                </h4>
                                <p>Our beer tracker will allow you to keep track of everything 'beer' with your own personal database.</p>
                                <a href="#" className="btn btn-light">Learn More</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </section>

{/*
    <aside className="callout">
        <div className="text-vertical-center">
            <h1>Vertically Centered Text</h1>
        </div>
    </aside>
*/}
{/*
    <section id="portfolio" className="portfolio">
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 text-center">
                    <h2>Our Work</h2>
                    <hr className="small" />
                    <div className="row">
                        <div className="col-md-6">
                            <div className="portfolio-item">
                                <a href="#">
                                    <img className="img-portfolio img-responsive" src="img/portfolio-1.jpg" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="portfolio-item">
                                <a href="#">
                                    <img className="img-portfolio img-responsive" src="img/portfolio-2.jpg" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="portfolio-item">
                                <a href="#">
                                    <img className="img-portfolio img-responsive" src="img/portfolio-3.jpg" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="portfolio-item">
                                <a href="#">
                                    <img className="img-portfolio img-responsive" src="img/portfolio-4.jpg" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <a href="#" className="btn btn-dark">View More Items</a>
                </div>

            </div>

        </div>

    </section>
*/}
    {/*
    <aside className="call-to-action bg-primary">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>The buttons below are impossible to resist.</h3>
                    <a href="#" className="btn btn-lg btn-light">Click Me!</a>
                    <a href="#" className="btn btn-lg btn-dark">Look at Me!</a>
                </div>
            </div>
        </div>
    </aside>
    */}
    {/*
    <section id="contact" className="map">
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;aq=0&amp;oq=twitter&amp;sll=28.659344,-81.187888&amp;sspn=0.128789,0.264187&amp;ie=UTF8&amp;hq=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;t=m&amp;z=15&amp;iwloc=A&amp;output=embed"></iframe>
        <br />
        <small>
            <a href="https://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;aq=0&amp;oq=twitter&amp;sll=28.659344,-81.187888&amp;sspn=0.128789,0.264187&amp;ie=UTF8&amp;hq=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&amp;t=m&amp;z=15&amp;iwloc=A"></a>
        </small>
    </section>
*/}

    <footer>
        <div id="contact" className="container">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 text-center">
                    <h4><strong>Beer Investigator</strong>
                    </h4>
                    <p>1285 Brewery Place
                        <br />Hops, WI 54487</p>
                    <ul className="list-unstyled">
                        <li><i className="fa fa-phone fa-fw"></i> (920) 217-1116</li>
                        <li><i className="fa fa-envelope-o fa-fw"></i> <a href="mailto:name@example.com">freudehack@gmail.com</a>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-inline">
                        <li>
                            <a href="#"><i className="fa fa-facebook fa-fw fa-3x"></i></a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-twitter fa-fw fa-3x"></i></a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-github fa-fw fa-3x"></i></a>
                        </li>
                    </ul>
                    <hr className="small" />
                    <p className="text-muted">Copyright &copy; Beer Investigator 2017</p>
                </div>
            </div>
        </div>
        <a id="to-top" href="#top" className="btn btn-dark btn-lg"><i className="fa fa-chevron-up fa-fw fa-1x"></i></a>
    </footer>

</div>
)
}
}
export default LandingPage;




