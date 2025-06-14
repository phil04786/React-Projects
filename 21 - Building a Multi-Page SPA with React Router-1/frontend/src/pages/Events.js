/* 
import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Some event",
  },
  {
    id: "e2",
    title: "Another event",
  },
];

function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
*/

// import { useEffect, useState } from "react";

import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  /*
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/events");

      if (!response.ok) {
        setError("Fetching events failed.");
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  */

  // const events = useLoaderData();
  // const data = useLoaderData();
  const { events } = useLoaderData();

  //Error-1
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;
  return (
    // <>
    //   <div style={{ textAlign: "center" }}>
    //     {isLoading && <p>Loading...</p>}
    //     {error && <p>{error}</p>}
    //   </div>
    //   {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    // </>
    // <EventsList events={events} />
    // <EventsList />
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

//Execute in the browers not on the Server. Can access any browers api like localStaorage, cookies etc. but not useState()
export async function loader() {
  // const response = await fetch("http://localhost:8080/events");
  // if (!response.ok) {
  //   //Error-1
  //   // return { isError: true, message: "Could not fetch events." };
  //   // throw new Error ();
  //   // throw { message: "Could not fetch events." }; //throw closest error element of App.js router [errorElement:]
  //   //Sending an Error Response to Error.js to get handled. It is better to throw Response with status then Object
  //   // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
  //   //   status: 500,
  //   // });
  //   throw json({ message: "Could not fetch events." }, { status: 500 });
  // } else {
  //   // const resData = await response.json();
  //   // return resData.events;
  //   return response;
  // }
  return defer({
    events: loadEvents(),
  });
}
