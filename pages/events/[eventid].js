import { Fragment } from "react";
import { useRouter } from "next/router";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById } from "../../dummy-data";

function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventid;
  const event = getEventById(eventId);
  if (!event) {
    return <p>No event Found..!!!</p>;
  }
  console.log("Event Id :" ,eventId, "Event is : ", event);

  return (
    <div>
      <h1>Event Details Page</h1>
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </div>
  );
}

export default EventDetailPage;
