import sanityClient from "./sanityClient";

export const fetchEvents = async () => {
  const query = `*[_type == "event"]{
    eventMeetupNo,
    eventName,
    date,
    timeFrom,
    timeTo,
    venueName,
    address,
    description,
    url,
    color,
    speakers[]->{
      name,
      title,
      businessName,
      "photo": photo.asset->url
    }
  }`;

    try {
      const events = await sanityClient.fetch(query);
      
      // Optimize image URLs for speakers' photos
      const optimizedEvents = events.map(event => ({
        ...event,
        speakers: event.speakers.map(speaker => ({
          ...speaker,
          photoUrl: `${speaker.photoUrl}?w=300&h=300&fm=webp&q=100`
        }))
      }));
      
      return optimizedEvents;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
};