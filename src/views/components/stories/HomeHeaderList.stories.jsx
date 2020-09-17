import React from "react";
import { HomeHeaderList } from "../../pages/StaticHome/HomeHeaderList";

export default {
  title: "HomeHeaderList",
  component: HomeHeaderList,
};

const listContent = [
  `Struggling to figure out what to build next? 
Need help deciding whether to learn React or if you should do Express? 
Are you feeling impostor syndrome?

Mintbean is a place where you can upskill yourself AND build your portfolio!`,
  `If you don't want to do this alone, GOOD NEWS! You don't have to. Bring your pals, or come on over and make NEW pals who are super friendly and eager to learn -- like YOU.
You can come here and be YOU. Be your most authentic self, and have FUN! That's what we like to encourage in the Mintbean community--growth, togetherness, fun, and a sense of belonging!`,
  `Because as developers ourselves, we feel your pain. We've gone through impostor syndrome, too! 
We've also been rejected 50 million times in an industry that claims to have "negative unemployment". Been there, done that! We know exactly how to get past the slump. And we want to teach you how.`,
];

const Template = (args) => <HomeHeaderList list={args} />;

export const Primary = Template.bind({});

Primary.args = {
  titles: ["We're a FREE community built just for you.", "Bring your friends!", "What's in it for us?"],
  content: listContent,
};
