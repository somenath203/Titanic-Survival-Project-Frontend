import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from "react-spinners/HashLoader";

import titanic_video from './titanic_video.mp4';

import './Home.css';


const Home = () => {

  const [openingLoadingScreen, setOpeningLoadingScreen] = useState(false);

  useEffect(() => {

    setOpeningLoadingScreen(true);

    setTimeout(() => {
      setOpeningLoadingScreen(false);
    }, 4000);

  }, []);

  const OpeningSpinner = () => {
    return (
      <div className="spinner-div">
        <HashLoader color={'#fff'} loading={openingLoadingScreen} size={100} />
      </div>
    )
  }

  return (
    <>
      {openingLoadingScreen ? <OpeningSpinner /> : <section className="showcase">


        <div className="video-container">
          <video src={titanic_video} autoPlay muted loop></video>
        </div>


        <div className="content">

          <p className="typewriting_effect">
            <Typewriter
              words={['Welcome to Titanic Survival Project', 'Check Weather You Survive The Disaster or Not']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={3600}
            />
          </p>

          <NavLink to='/titanicform'>
            <button className="get_started">GET STARTED</button>
          </NavLink>

        </div>

      </section>}
    </>
  )
}

export default Home;