import React from "react";
import { MeetCard } from "../MeetCard";

// This default export determines where you story goes in the story list
export default {
  title: "MeetCard",
  component: MeetCard,
};

const testDescription =
  "Doggo ipsum borkf heckin angery woofer shoob what a nice floof puggorino doing me a frighten, wrinkler such treat most angery pupper I have ever seen porgo.";

const Template = (args) => <MeetCard event={args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: "Test Event Title",
  description: testDescription,
  startDate: "2020-09-14T07:00:00",
  endDate: "2020-09-17T07:00:00",
  image: "https://www.kylebar.net/assets/images/ProfilePic-667fae86635de9cc40d293b47f9a1047.jpg",
  region: "America/Toronto",
};
