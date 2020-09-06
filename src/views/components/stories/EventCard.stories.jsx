import React from "react";
import { EventCard } from "../EventCard";

// This default export determines where you story goes in the story list
export default {
  title: "EventCard",
  component: EventCard,
};

const testDescription =
  "Doggo ipsum borkf heckin angery woofer shoob what a nice floof puggorino doing me a frighten, wrinkler such treat most angery pupper I have ever seen porgo.";

const Template = (args) => <EventCard event={args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  name: "Test Event Title",
  description: testDescription,
  startDate: new Date("2020-09-10T18:59:50.300Z"),
  endDate: new Date("2020-09-14T18:59:50.300Z"),
  image: "https://www.kylebar.net/assets/images/ProfilePic-667fae86635de9cc40d293b47f9a1047.jpg",
  groupSize: 1,
  difficulty: "Beginner",
};
