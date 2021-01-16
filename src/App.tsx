import * as React from "react";
import "./styles.css";
import seedData from "./seed-data.json";
import Title from "./Title";
import HourListing from "./HourListing";
import { mapToOpenSegments } from "./algorithm";

export default function App() {
  return (
    <div className="container mx-auto w-4/5 my-10">
      <Title></Title>
      <HourListing weeklyOpenHours={mapToOpenSegments(seedData)}></HourListing>
    </div>
  );
}
