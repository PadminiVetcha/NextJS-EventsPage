import { useRouter } from 'next/router';
import Head from 'next/head';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import {getAllEvents} from '../../helpers/api-util';
function AllEventsPage(props) {
  const router=useRouter();
  const {events} = props;
  console.log("All Events : ", events);

  function findEventsHandler(year, month) {
    const fullPath=`/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name='description' content= 'Come and have a look at numerous events' />
      </Head>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={events}/>
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {props: {
    events: allEvents,
  },
  revalidate: 60,
};

}

export default AllEventsPage;
