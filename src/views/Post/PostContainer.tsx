import React, { FC } from "react";
import { connect } from "react-redux";
import PostComponent from "./PostComponent";
import { Post } from "../../types/Post";
import { updatePost } from "../../state/actions/postActions";

interface PostContainerProps {
  post: Post;
  dispatchUpdatePost: (id: number, updatedPost: Post) => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatchUpdatePost: (id: number, updatedPost: Post): void => dispatch(updatePost(id, updatedPost)),
});

const PostContainer: FC<PostContainerProps> = ({
  post,
  dispatchUpdatePost,
}: PostContainerProps): React.ReactElement => {
  const handleUpdate = (id: number, post: Post) => {
    dispatchUpdatePost(id, post);
  };
  return <PostComponent post={post} handleUpdate={handleUpdate} />;
};

export default connect(null, mapDispatchToProps)(PostContainer);
