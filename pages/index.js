import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from "../components/events/event-list";
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {

  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meta name='description' content= 'Come and have a look at numerous events' />
      </Head>
      <NewsletterRegistration/>
        <EventList items={props.fEvents}/>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents =await getFeaturedEvents(); 
  return {
    props: {fEvents : featuredEvents},
    revalidate: 1800 // half an hr
  };
}

export default HomePage;
