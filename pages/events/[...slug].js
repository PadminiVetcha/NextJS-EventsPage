import { Fragment } from "react";
import Head from "next/head";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

function FilterEventsPage(props) {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${props.date.month}/${props.date.year}`}
      />
    </Head>
  );

  // // if the dynamic values aren't there in uri
  // if (!filterData) {
  //   return <p className="center">Loading..</p>;
  // }
  // const filteredYear = filterData[0]; // extracting year from the object array
  // const filteredMonth = filterData[1]; // extracting month from the object array
  // const numYear = +filteredYear; // converting year into number from string
  // const numMonth = +filteredMonth; // converting month into number from string

  // to handle /events/abc/5 case
  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        ;
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  // if the filtered events array is empty (no results of applied filter)
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0]; // extracting year from the object array
  const filteredMonth = filterData[1]; // extracting month from the object array
  const numYear = +filteredYear; // converting year into number from string
  const numMonth = +filteredMonth; // converting month into number from string

  // to handle /events/abc/5 case
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2050 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilterEventsPage;
