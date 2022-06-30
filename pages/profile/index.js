import axios from "axios";
import React, { useState, useEffect } from "react";
import MainHeader from "../../components/header";
import {
  catchErrors,
  notifyErrorHandler,
  resolveErrorMsg,
} from "../../middleware/catchErrors";
import Styles from "./styles.module.scss";

export default function index() {
  const [mapConfig, setMapConfig] = useState({
    address: null,
    city: null,
    postcode: null,
    state: null,
    zoom: 15,
    height: 400,
  });
  const [mapPosition, setMapPosition] = useState({
    lat: 0,
    lng: 0,
  });

  // map position config
  const [error, setError] = useState(false);

  const addressHandler = async ({ lat, lng }) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const response = await axios.get(url);
      const { address, display_name } = response?.data;
      const { state, city, postcode } = address;
      setMapConfig({
        address: display_name ?? "",
        postcode: postcode ?? "",
        city: city ?? "",
        state: state ?? "",
      });
    } catch (error) {
      catchErrors(error, setError);
      let getError = resolveErrorMsg(error);
      setError(true);
      notifyErrorHandler({
        type: "error",
        title: getError?.errorMsg,
        msg: error,
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          addressHandler({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }, []);

  return (
    <div>
      <MainHeader />
      <div className={Styles.location}>
        Your location: <span>{mapConfig.address ?? "Loading..."}</span>
      </div>
    </div>
  );
}
