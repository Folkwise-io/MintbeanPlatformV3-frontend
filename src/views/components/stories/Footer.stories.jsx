import React from "react";
import { Footer } from "../Footer";

export default {
  title: "Footer",
  component: Footer,
};

const Template = (args) => <Footer footer={args} />;

export const Primary = Template.bind({});

Primary.args = {
  footerNav: ["Home", "Events", "Terms of Service", "Privacy Policy"],
  links: ["/home", "/events", "/tos", "/privacy-policy"],
};
