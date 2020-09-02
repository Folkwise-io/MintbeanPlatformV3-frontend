import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";

import { fetchPostsByUsername } from "../../services/postService";
import { fetchUsers } from "../../state/actions/userActions";
import { StoreState } from "../../state/types";
import UserListComponent from "../UserList/UserListComponent";
import { User } from "../../types/User";
import { Post } from "../../types/Post";

const mapStateToProps = (state: StoreState) => ({
  storeUsers: state.users,
});

// TODO: properly type
const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUsers: (): any => dispatch(fetchUsers()),
});

interface HomeProps {
  storeUsers: User[];
  dispatchFetchUsers: any;
}
const Home: FC<HomeProps> = ({ storeUsers, dispatchFetchUsers }: HomeProps) => {
  const [username, setUsername] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatchFetchUsers();
  }, []);

  const getPosts = async (): Promise<void> => {
    const fetchedPosts = await fetchPostsByUsername(username);
    setPosts(fetchedPosts);
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };

  return (
    <div className="container mx-auto max-w-screen-md">

      <h2>Users</h2>
      <UserListComponent users={storeUsers} />
      <br />
      <h2>Fetch post by username</h2>
      <input onChange={handleChange} type="text" name="username" className="border-2 border-gray-200" />
      <button onClick={getPosts}>Get Posts</button>
      {posts.length > 0 ? (
        <>
          <h3>posts by {username}:</h3>
          <ul>
            {posts.map((p) => (
              <div key={p.id}>
                <div>{p.body}</div>
                <div>{p.createdAt}</div>
              </div>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// const handleSubmit = (e: any): void => {
//   e.preventDefault();
//   console.log(data);
//   dispatchCreatePost(data);
// };
//
// const changeHandler = (event: any) => {
//   event.persist();
//
//   const value = event.target.value;
//
//   setData((prevState) => ({
//     ...prevState,
//     [event.target.name]: value,
//   }));
// };
//
// ...

// <form onSubmit={handleSubmit} className="flex flex-col">
//   <input
//     type="text"
//     value={data.username}
//     name="username"
//     onChange={changeHandler}
//     placeholder="username"
//     className="mb-2 p-2 border-2 border-solid border-gray-500"
//   />
//
//   <textarea
//     name="body"
//     value={data.body}
//     placeholder="body"
//     onChange={changeHandler}
//     className="mb-2 p-2 border-2 border-solid border-gray-500"
//   />
//   <input type="submit" value="add post" className="mb-2 p-2" />
// </form>
// <h2>have some posts</h2>
// <ul>
//   {posts.map((b) => (
//     <PostContainer key={b.id} post={b} />
//   ))}
// </ul>
// </div>
