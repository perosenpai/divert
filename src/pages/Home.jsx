import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll'
import styled from 'styled-components';
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Helmet } from "react-helmet";
import {FaPhoneAlt, FaBars, FaFolderOpen, FaLink} from "react-icons/fa";
// import {ToastContainer, toast} from 'react-toastify'; 
import DivertLogo from '../assets/img/divert-logo.png';
import ClipLoader from "react-spinners/ClipLoader";
import thumbnail1 from '../assets/img/thumbnails/1.jpg';
import thumbnail2 from '../assets/img/thumbnails/2.jpg';
import thumbnail3 from '../assets/img/thumbnails/3.jpg';
import thumbnail4 from '../assets/img/thumbnails/4.jpg';
import thumbnail5 from '../assets/img/thumbnails/5.jpg';
import thumbnail6 from '../assets/img/thumbnails/6.jpg';
import thumbnailFull1 from '../assets/img/fullsize/1.jpg';
import thumbnailFull2 from '../assets/img/fullsize/2.jpg';
import thumbnailFull3 from '../assets/img/fullsize/3.jpg';
import thumbnailFull4 from '../assets/img/fullsize/4.jpg';
import thumbnailFull5 from '../assets/img/fullsize/5.jpg';
import thumbnailFull6 from '../assets/img/fullsize/6.jpg';
import Scroll from 'react-scroll'
import {hideLoader, showLoader} from '../App.js'

function Home() {
    let user = localStorage.getItem("divert-user");
    const navigate = useNavigate();
    const [values] = useState({
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(handleValidation()){
                   
          const {data} = await axios.get(loginRoute, {
            user
          });

          if(data.status === true) navigate("/divert")
        }
      };

      const handleValidation = () =>{
        const {user} = values;
    
        if(user === ""){
            navigate("/login")
        }else{
            navigate("/divert")
        }
        return true;
      }

      useEffect(() => {
        if (user){
         navigate("/divert")   
        }
    },[])

//page loading
    
  useEffect(() => {
    showLoader()
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      hideLoader();
    };
      
    loadData();
  }, [])

    return ( 
<> 

  <nav className="navbar navbar-light navbar-expand-md py-3" style={{position: "fixed", width: "100%", zIndex:"999"}}>
    <div className="container">
      <a className="navbar-brand d-flex align-items-center" href="" >
        <img src={DivertLogo} style={{width: "30px", height: "30px"}}></img>
        <span id="divert-name-id" style={{fontSize: "18px"}}>Divert</span>
      </a>
      <button
        data-toggle="collapse"
        className="navbar-toggler"
        data-target="#navcol-1"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navcol-1"
        style={{ color: "rgb(253, 112, 20)" }}
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <ScrollLink
              to="about" 
              spy={true} 
              smooth={true} 
              duration={200} 
              className="nav-link"
              >
              About
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink
              to="services-container" 
              spy={true} 
              smooth={true} 
              duration={200} 
              className="nav-link"
              >
              Why Divert?
            </ScrollLink>
          </li>
          <li className="nav-item">
          <ScrollLink
              to="pricing-div" 
              spy={true} 
              smooth={true} 
              duration={200} 
              className="nav-link"
              >
              Pricing
            </ScrollLink>
          </li>
          <li className="nav-item">
          <ScrollLink
              to="notions" 
              spy={true} 
              smooth={true} 
              duration={200} 
              className="nav-link"
              >
              Notions
            </ScrollLink>
          </li>
          <li className="nav-item">
          <ScrollLink
              to="contact" 
              spy={true} 
              smooth={true} 
              duration={200} 
              className="nav-link"
              >
              Contact Us
            </ScrollLink>
          </li>
        </ul>
        <Link
          className="btn btn-primary"
          role="button"
          id="button-signup"
          to="/login"
          style={{ background: "rgb(253,112,20)" }}
          onSubmit={(event) => handleSubmit(event)}
        >
          GET STARTED
        </Link>
      </div>
    </div>
  </nav>
  <header
    className="text-center text-white d-flex masthead"
    style={{ background: "#222831", height: "100vh" }}
  >
    <div className="container my-auto">
      <div className="row">
        <div className="col-lg-10 mx-auto" style={{marginTop: 'auto', marginBottom: 'auto'}}>
          <h1 className="text-uppercase">
            <strong>Feeling like things should get easier?</strong>
          </h1>
          <hr />
        <p className="text-faded mb-5">
          Try to organize team and track progress with this Divert, simple
          app for startup teams
        </p>
        <Link
          id="button-login"
          className="btn btn-primary btn-xl js-scroll-trigger"
          role="button"
          href="#services"
          style={{ background: "rgb(253,112,20)" }}
        >
          Find Out More
        </Link>
        </div>
      </div>
      <div className="col-lg-8 mx-auto">
      </div>
    </div>
  </header>
  <section
    id="about"
    style={{ background: "#f05f40" }}
  >
    <div className="container">
      <div className="row">
        <div className="col offset-lg-8 text-center mx-auto">
          <h2 className="text-white section-heading">
            We've got what you need!
          </h2>
          <hr className="light my-4" />
          <p className="text-faded mb-4">
          Have you created a new team, or do you have an idea for a new team and don't have a place for good communication? Join us.
          </p>
          <Link
            
            className="btn btn-light btn-xl js-scroll-trigger"
            role="button"
            href="#services"
          >
            Get Started!
          </Link>
        </div>
      </div>
    </div>
  </section>
  <section id="services">
    <div id="services-container"className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading">At Your Service</h2>
          <hr className="my-4" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-3 text-center">
          <div className="mx-auto service-box mt-5">
            <FaPhoneAlt></FaPhoneAlt>
            <h3 className="mb-3">At your service</h3>
            <p className="text-muted mb-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 text-center">
          <div className="mx-auto service-box mt-5">
          <FaBars></FaBars>
            <h3 className="mb-3">Ready to Ship</h3>
            <p className="text-muted mb-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 text-center">
          <div className="mx-auto service-box mt-5">
          <FaFolderOpen></FaFolderOpen>
            <h3 className="mb-3">Up to Date</h3>
            <p className="text-muted mb-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 text-center">
          <div className="mx-auto service-box mt-5">
          <FaLink></FaLink>
            <h3 className="mb-3">Made with Love</h3>
            <p className="text-muted mb-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* DELETE LATERTR */}
  <section id="portfolio-1" className="p-0">
        <div className="container-fluid p-0">
            <div className="row no-gutters popup-gallery">
                <div className="col-sm-6 col-lg-4"><Link className="portfolio-box" href="assets/img/fullsize/1.jpg"><img className="img-fluid" src={thumbnail1}/>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded"><span>Category</span></div>
                                <div className="project-name"><span>Service</span></div>
                            </div>
                        </div>
                    </Link></div>
                <div className="col-sm-6 col-lg-4"><Link className="portfolio-box" href="assets/img/fullsize/2.jpg"></Link></div>
                <div className="col-sm-6 col-lg-4"><Link className="portfolio-box" href="assets/img/fullsize/3.jpg"><img className="img-fluid" src={thumbnail3}/>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded"><span>Category</span></div>
                                <div className="project-name"><span>Teamwork</span></div>
                            </div>
                        </div>
                    </Link></div>
                <div className="col-sm-6 col-lg-4"><Link className="portfolio-box" href="assets/img/fullsize/4.jpg"></Link></div>
                <div className="col-sm-6 col-lg-4"><Link className="portfolio-box" href="assets/img/fullsize/5.jpg"><img className="img-fluid" src={thumbnail4}/>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                                <div className="project-category text-faded"><span>Category</span></div>
                                <div className="project-name"><span>Schedule</span></div>
                            </div>
                        </div>
                    </Link></div>
                <div className="col-sm-6 col-lg-4"><a className="portfolio-box" href="assets/img/fullsize/6.jpg"></a></div>
            </div>
        </div>
    </section>
    {/* DELETE LATERTR */}
  <div id="pricing-div"className="container py-4 py-xl-5">
    <div className="row mb-5">
      <div className="col-md-8 col-xl-6 text-center mx-auto">
        <h2 className="font-weight-bold">Want to make team more productive?</h2>
      </div>
    </div>
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 d-xl-flex">
      <div className="col mb-4">
        <div className="card mb-4">
          <div className="card-body text-center p-4">
            <h4 className="font-weight-bold card-subtitle">Free</h4>
            <h4 className="display-4 font-weight-bold card-title">$0</h4>
            <p>The best way for starting teams</p>
            <Link id="button-login"className="btn btn-light d-block w-100" role="button" to="/login">
              Get started
            </Link>
          </div>
        </div>
        <div className="bg-light border rounded border-light p-4">
          <ul className="list-unstyled mb-0">
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Unlimited message access</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Unlimited integration with other apps</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>
                Audio and video conversations with screen sharing up to 10
                people&nbsp;
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card border-danger mb-4" style={{borderColor: "red!important"}}>
          <div className="card-body text-center p-4">
            <span
              className="badge badge-pill badge-primary position-absolute top-0 start-50 translate-middle text-uppercase mb-3"
              style={{ background: "rgb(253,112,20)" }}
            >
              Most Popular
            </span>
            <h4 className="font-weight-bold card-subtitle">Pro</h4>
            <h4 className="display-4 font-weight-bold card-title">
              $5.25
              <span
                className="font-weight-normal text-muted"
                style={{ fontSize: "2rem" }}
              >
                /mo
              </span>
            </h4>
            <p>All benefits for free, and:</p>
            <Link className="btn btn-primary d-block w-100" role="button" href="#">
              <span
              >
                Get started
              </span>
            </Link>
          </div>
        </div>
        <div className="bg-light border rounded border-light p-4">
          <ul className="list-unstyled mb-0">
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Full context of message history</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Audio and video conversations up to 50 people</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Improved searches</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Simple data export</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Views: Calendar, Table and Dashboard</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card mb-4">
          <div className="card-body text-center p-4">
            <h4 className="font-weight-bold card-subtitle">Enterprise</h4>
            <h4 className="display-4 font-weight-bold card-title">
              $10.25
              <span
                className="font-weight-normal text-muted"
                style={{ fontSize: "2rem" }}
              >
                /mo
              </span>
            </h4>
            <p>All benefits of Pro, and:</p>
            <Link className="btn btn-dark d-block w-100" role="button" href="#">
              <strong>
                <span>
                  GET STARTED
                </span>
              </strong>
              <br />
            </Link>
          </div>
        </div>
        <div className="bg-light border rounded border-light p-4">
          <ul className="list-unstyled mb-0">
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Multiple project management</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Greater for larger team meetings</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Unlimited data storage&nbsp;</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>24/7 support&nbsp;</span>
            </li>
            <li className="d-flex mb-2">
              <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-check-lg"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
              <span>Active Directory sync with OneLogin</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  <div id="notions"className="container py-4 py-xl-5">
    <div className="row mb-5">
      <div className="col-md-8 col-xl-6 text-center mx-auto">
        <h2 className="font-weight-bold">Testimonials</h2>
      </div>
    </div>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
      <div className="col mb-4">
        <div>
          <p className="bg-light border rounded border-light p-4">
            Nisi sit justo faucibus nec ornare amet, tortor torquent. Blandit
            class dapibus, aliquet morbi.
          </p>
          <div className="d-flex">
            <img
              className="rounded-circle flex-shrink-0 mr-3 fit-cover"
              width={50}
              height={50}
              style={{marginRight: "20px"}}
              src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
            />
            <div>
              <p
                className="font-weight-bold text-danger mb-0"
                style={{ color: "red!important" }}
              >
                John Smith
              </p>
              <p className="text-muted mb-0">Erat netus</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div>
          <p className="bg-light border rounded border-light p-4">
            Nisi sit justo faucibus nec ornare amet, tortor torquent. Blandit
            class dapibus, aliquet morbi.
          </p>
          <div className="d-flex">
            <img
              className="rounded-circle flex-shrink-0 mr-3 fit-cover"
              width={50}
              height={50}
              style={{marginRight: "20px"}}
              src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
            />
            <div>
              <p
                className="font-weight-bold text-danger mb-0"
                style={{ borderColor: "rgb(253,112,20)" }}
              >
                John Smith
              </p>
              <p className="text-muted mb-0">Erat netus</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div>
          <p className="bg-light border rounded border-light p-4">
            Nisi sit justo faucibus nec ornare amet, tortor torquent. Blandit
            class dapibus, aliquet morbi.
          </p>
          <div className="d-flex">
            <img
              className="rounded-circle flex-shrink-0 mr-3 fit-cover"
              width={50}
              height={50}
              style={{marginRight: "20px"}}
              src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
            />
            <div>
              <p
                className="font-weight-bold text-danger mb-0"
                style={{ borderColor: "rgb(253,112,20)" }}
              >
                John Smith
              </p>
              <p className="text-muted mb-0">Erat netus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="text-white bg-dark">
    <div className="container text-center">
      <h2 className="mb-4">Welcome to the new world.</h2>
      <Link
        className="btn btn-light btn-xl sr-button"
        role="button"
        data-aos="zoom-in"
        data-aos-duration={400}
        data-aos-once="true"
        href="#"
      >
        Try for free
      </Link>
    </div>
  </section>
  <section id="contact"className="position-relative py-4 py-xl-5">
    <div className="container position-relative">
      <div id="contact-us-row-styled" className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card">
            <div className="card-body text-center p-sm-5">
              <h2 className="font-weight-bold mb-3">Contact us</h2>
              <form method="post">
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    id="name-2"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="email"
                    id="email-2"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="message-2"
                    name="message"
                    rows={6}
                    placeholder="Message"
                    defaultValue={""}
                  />
                </div>
                <div>
                  <button
                    id="button-login"
                    className="btn btn-primary d-block w-100"
                    type="submit"
                    style={{ background: "rgb(253,112,20)" }}
                  >
                    Send{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="text-white bg-dark">
    <div className="container py-4 py-lg-5">
      <div id="footer-home-height" className="row justify-content-center">
        <div className="col-sm-4 col-md-3 text-center text-lg-left d-flex flex-column item">
          <h3 className="font-weight-bold" style={{ fontSize: "1rem" }}>
            Services
          </h3>
          <ul className="list-unstyled">
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Web design
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Development
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Hosting
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-3 text-center text-lg-left d-flex flex-column item">
          <h3 className="font-weight-bold" style={{ fontSize: "1rem" }}>
            About
          </h3>
          <ul className="list-unstyled">
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Company
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Team
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Legacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-3 text-center text-lg-left d-flex flex-column item">
          <h3 className="font-weight-bold" style={{ fontSize: "1rem" }}>
            Careers
          </h3>
          <ul className="list-unstyled">
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Job openings
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}}href="#">
                Employee success
              </Link>
            </li>
            <li>
              <Link className="text-gray" style={{color: 'gray'}} href="#">
                Benefits
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-3 text-center text-lg-left d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">
          <div className="font-weight-bold d-flex align-items-center mb-2">
            <img src={DivertLogo}></img>
            <span id="divert-name-id">Divert</span>
          </div>
          <p className="text-white-50 copyright">
            We are here for your.
          </p>
        </div>
      </div>
      <hr style={{ background: "#fd7014" }} />
      <div className="d-flex justify-content-between pt-3">
                <p style={{opacity: "0.8", color: 'gray'}}className="mb-0">Copyright © 2023 Divert</p>
                <ul className="list-inline text-white-50 mb-0">
                  <a id="social-media-links" href="https://www.facebook.com/divert-app">
                    <li className="list-inline-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-facebook">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                      </svg>
                    </li>
                  </a>
                  <a id="social-media-links" href="https://www.twitter.com/divert-app">
                  <li className="list-inline-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-twitter">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg>
                  </li>
                  </a>
                  <a id="social-media-links" href="https://www.instagram.com/divert-app">
                    <li className="list-inline-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-instagram">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                      </svg>
                    </li>
                  </a>
                </ul>
              </div>
    </div>
  </footer>
</>

    )
}

const FormContainer = styled.div``;

export default Home