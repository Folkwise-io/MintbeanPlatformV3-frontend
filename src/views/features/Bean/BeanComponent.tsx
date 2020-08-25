import React, { FC, useState } from "react";
import { Bean } from "../../../types/Bean";

interface BeanComponentProps {
  bean: Bean;
  handleUpdate: (id: number, updatedBean: Bean) => void;
}

const BeanComponent: FC<BeanComponentProps> = ({ bean, handleUpdate }: BeanComponentProps): React.ReactElement => {
  const { username, id, body, createdAt } = bean;
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
      <form onSubmit={(event: any) => handleSubmit(e)} className="flex flex-col">
        <input type="text" name="username" value={data.username} onChange={changeHandler} />
        <textarea name="body" value={data.body} onChange={changeHandler} />
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
};

export default BeanComponent;
