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
  startDate: new Date("Mon, 14 Sep 2020 07:00:00 GMT"),
  endDate: new Date("Thu, 17 Sep 2020 07:00:00 GMT"),
  image: "https://www.kylebar.net/assets/images/ProfilePic-667fae86635de9cc40d293b47f9a1047.jpg",
};
