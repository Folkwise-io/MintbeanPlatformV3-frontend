import React, { FC, useState, useEffect } from "react";
import { Bean } from "../../types/Bean";
import BeanContainer from "../features/Bean/BeanContainer";
import { connect } from "react-redux";
import { StoreState } from "../../state/types";
import { createBean } from "../../state/actions/beanActions";

const mapStateToProps = (state: StoreState) => ({
  beans: state.beans.beans,
});

// TODO: properly type
const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateBean: (bean: Bean): any => dispatch(createBean(bean)),
});

interface HomeProps {
  beans: Bean[];
  dispatchCreateBean: any;
}

const Home: FC<HomeProps> = ({ beans, dispatchCreateBean }: HomeProps) => {
  const [data, setData] = useState({ username: "", body: "" });

  useEffect(() => {
    console.log({ beans });
  }, [beans]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(data);
    dispatchCreateBean(data);
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
          <BeanContainer key={b.id} bean={b} />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
