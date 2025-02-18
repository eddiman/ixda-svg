import { useState, useEffect, useRef } from "react";

import "../styles/events.scss";
import PhotoDeck from "../Components/PhotoDeck";
import { fetchEvents } from "../api/fetchEvents";
import SplashScreen from "../Components/SplashScreen/SplashScreen";
import NavBar from "../Components/NavBar/NavBar";
import AnimatedButton from "../Components/AnimatedButton/AnimatedButton";
import Event from "../Components/Event/Event";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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
console.log(hash);

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
      {events
        .sort((a, b) => b.eventMeetupNo - a.eventMeetupNo) // Sort in descending order
        .map((event, index) => (
          <Event key={index} event={event} />
        ))}
    </div>
  );
};

export const Events = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 300); // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts

  return (
    <>
      {showLoading ? <SplashScreen color={4} selected={true} /> : ""}
      <NavBar activeNo={4} />
      <div className={".event-container fade-in"}>
        <EventsList />
      </div>
    </>
  );
};
