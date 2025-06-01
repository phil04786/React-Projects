import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { fetchAvailablePlaces } from "../../http.js";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); //loading state based on the data fetching
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  /*
  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);
  */
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        // const response = await fetch("http://localhost:3000/places");
        // const resData = await response.json();

        // if (!response.ok) {
        //   throw new Error("Failed to fetch places");
        // }

        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          // setAvailablePlaces(resData.places);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try  again later.",
        });
        setIsFetching(false);
      }
      // setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    <Error title="An error occured!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching place data..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
