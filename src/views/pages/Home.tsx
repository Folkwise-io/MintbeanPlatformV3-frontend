import React, { FC, useState, useEffect } from "react";
import { Post } from "../../types/Post";
import PostContainer from "../features/Post/PostContainer";
import { connect } from "react-redux";
import { StoreState } from "../../state/types";
import { createPost } from "../../state/actions/postActions";
import LuanchesContainer from "../features/Launches/LaunchesContainer";

const mapStateToProps = (state: StoreState) => ({
  posts: state.posts.posts,
});

// TODO: properly type
const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreatePost: (post: Post): any => dispatch(createPost(post)),
});

interface HomeProps {
  posts: Post[];
  dispatchCreatePost: any;
}

const Home: FC<HomeProps> = ({ posts, dispatchCreatePost }: HomeProps) => {
  const [data, setData] = useState({ username: "", body: "" });

  useEffect(() => {
    console.log({ posts });
  }, [posts]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(data);
    dispatchCreatePost(data);
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
      <LuanchesContainer />
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
        <input type="submit" value="add post" className="mb-2 p-2" />
      </form>
      <h2>have some posts</h2>
      <ul>
        {posts.map((b) => (
          <PostContainer key={b.id} post={b} />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
