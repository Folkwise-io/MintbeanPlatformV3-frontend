import React, { FC } from "react";
import { Bean } from "../../types/Bean";
import BeanComponent from "../features/Bean/BeanComponent";

const testBeans: Bean[] = [
  { id: 1, username: "clairefro", body: "this is bean 1", createdAt: new Date() },
  { id: 2, username: "clairefro", body: "this is bean 2", createdAt: new Date() },
  { id: 3, username: "clairefro", body: "this is bean 3", createdAt: new Date() },
  { id: 4, username: "clairefro", body: "this is bean 4", createdAt: new Date() },
];
const Home: FC = () => (
  <div>
    <h1>Hello world</h1>
    <h2>have some beans</h2>
    <ul>
      {testBeans.map((b) => (
        <BeanComponent key={b.id} body={b.body} username={b.username} createdAt={b.createdAt} />
      ))}
    </ul>
  </div>
);

export default Home;
