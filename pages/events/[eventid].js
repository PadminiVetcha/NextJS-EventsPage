import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";

function EventDetailPage(props) {
  const event = props.selectedEvent;
  if (!event) {
    return <div className="center">Loading..</div>;
  }
  // console.log("Event is : ", event);

  return (
    <div>
      <h1>Event Details Page</h1>
      <Fragment>
        <Head>
          <title>{event.title}</title>
          <meta
            name="description"
            content={event.description}
          />
        </Head>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
export default EventDetailPage;
