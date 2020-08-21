import React, { FC, useState } from "react";
import { Bean } from "../../types/Bean";
import BeanComponent from "../features/Bean/BeanComponent";
import { connect } from "react-redux";
import { StoreState } from "../../state/store";
// import PropTypes from "prop-types";

const mapStateToProps = (state: StoreState) => ({
  beans: state.beans,
});

// const testBeans: Bean[] = [
// { id: 1, username: "clairefro", body: "this is bean 1", createdAt: new Date() },
// { id: 2, username: "clairefro", body: "this is bean 2", createdAt: new Date() },
//   { id: 3, username: "clairefro", body: "this is bean 3", createdAt: new Date() },
//   { id: 4, username: "clairefro", body: "this is bean 4", createdAt: new Date() },
// ];

interface HomeProps {
  beans: Bean[];
}
const Home: FC<HomeProps> = ({ beans }: HomeProps) => {
  const [data, setData] = useState({ username: "", body: "" });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(data);
    // dispatch create bean
  };

  const changeHandler = (event: any) => {
    event.persist();

    const value = event.target.value;

    setData((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  return (
    <div className="container mx-auto max-w-screen-md">
      <h1>Hello world</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={data.username}
          name="username"
          onChange={changeHandler}
          placeholder="username"
          className="mb-2 p-2 border-2 border-solid border-gray-500"
        />

        <textarea
          name="body"
          value={data.body}
          placeholder="body"
          onChange={changeHandler}
          className="mb-2 p-2 border-2 border-solid border-gray-500"
        />
        <input type="submit" value="add bean" className="mb-2 p-2" />
      </form>
      <h2>have some beans</h2>
      <ul>
        {beans.map((b) => (
          <BeanComponent key={b.id} body={b.body} username={b.username} createdAt={b.createdAt} />
        ))}
      </ul>
    </div>
  );
};

// Home.propTypes = {
//   beans: PropTypes.arrayOf(Bean),
// };
export default connect(mapStateToProps)(Home);
