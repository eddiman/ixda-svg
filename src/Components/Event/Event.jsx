import React from "react";
import BaseLayout from "../BaseLayout/BaseLayout";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./Event.module.scss";

const Event = ({ event }) => {
  const {
    eventMeetupNo,
    eventName,
    date,
    timeFrom,
    timeTo,
    venueName,
    address,
    description,
    url,
    speakers,
    color,
  } = event;

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${day}. ${month} ${year}`;
  }

  return (
    <BaseLayout
      title={eventName}
      subTitle={`Meetup #${eventMeetupNo}`}
      color={color}
      anchorId={"meetup"+eventMeetupNo}
    >
      <div className={styles.eventContainer} id={`#${eventMeetupNo}`}>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottomContainer}>
          <div className={styles.eventDetails}>
            <div>
              <p>{formatDate(date)}</p>
              <p>kl. {timeFrom}</p>
              <p>@ {venueName}</p>
              <p>{address}</p>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Link to Meetup →
            </a>
          </div>
          <div className={styles.speakers}>
            {speakers.map((speaker, index) => (
              <PersonCard key={index} person={speaker} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Event;
// In the code snippet above, we have an Event component that displays information about an event. The component uses the BaseLayout component to structure the layout of the page. It also fetches data about the event using the fetchEventById function from the sanityClient API.
