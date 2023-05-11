import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

function FilterEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  console.log("Filter Data : ", filterData); // gets the dynamic year and month entered in uri

  // if the dynamic values aren't there in uri
  if (!filterData) {
    return <p className="center">Loading..</p>;
  }

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
    return(
    <Fragment>
      <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>;
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>);
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // if the filtered events array is empty (no results of applied filter)
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No events found for the chosen filter</p></ErrorAlert>
        <div className='center'>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilterEventsPage;
