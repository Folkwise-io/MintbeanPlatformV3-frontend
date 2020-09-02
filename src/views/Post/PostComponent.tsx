import React, { FC, useState } from "react";
import { Post } from "../../types/Post";

interface PostComponentProps {
  post: Post;
  handleUpdate: (id: number, updatedPost: Post) => void;
}

const PostComponent: FC<PostComponentProps> = ({ post, handleUpdate }: PostComponentProps): React.ReactElement => {
  const { username, id, body, createdAt } = post;
  const [data, setData] = useState({
    id,
    body,
    createdAt,
    username,
  });

  const changeHandler = (event: any) => {
    event.persist();

    const value = event.target.value;

    setData((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleUpdate(data.id, data);
  };

  return (
    <div className="my-2 p-2 border-solid border-2 border-gray-600">
      <p className="font-semibold">{username}</p>
      <p>{id}</p>
      <p>{body}</p>
      <p>{createdAt.toString()}</p>
      <form onSubmit={(event: any) => handleSubmit(event)} className="flex flex-col">
        <input type="text" name="username" value={data.username} onChange={changeHandler} />
        <textarea name="body" value={data.body} onChange={changeHandler} />
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
};

export default PostComponent;
