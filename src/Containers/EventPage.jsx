import { useState, useEffect, useRef } from "react";

import "../styles/eventPage.scss";
import { fetchEvents } from "../api/fetchEvents";
import SplashScreen from "../Components/SplashScreen/SplashScreen";
import Event from "../Components/Event/Event";
import Footer from "../Components/Footer/Footer";
import BaseLayout from "../Components/BaseLayout/BaseLayout";
import Menu from "../Components/Menu/Menu";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const eventList = await fetchEvents();
      setEvents(eventList);
      setLoading(false);
    };
    getEvents();
  }, []);

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;

    if (hash) {
      // Scroll to the element with the corresponding ID
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          block: 'start', // Scroll to the start of the element
        });
      }
    }
  }, [loading]); 
  if (loading) return <p>Loading Events...</p>;

  return (
    <div className="events-list">

      { loading ? <BaseLayout subTitle="..." title="Events">Loading Events...</BaseLayout> :
      events
        .sort((a, b) => b.eventMeetupNo - a.eventMeetupNo) // Sort in descending order
        .map((event, index) => (
          <Event key={index} event={event} />
        ))}
        <Footer/>

    </div>
  );
};

export const EventPage = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // This has to be about 300ms more than fadeOut animation duration in SplashScreen.module.scss, something with how css renders differently than what the setTimeout times stuff, if same the fadout animation cuts out a bit shorter
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts

  return (
    <>
    <Menu/>
      {showLoading ? <SplashScreen/> : ""}
      <div className={"event-container fade-in"}>
        <EventsList />
      </div>
    </>
  );
};
