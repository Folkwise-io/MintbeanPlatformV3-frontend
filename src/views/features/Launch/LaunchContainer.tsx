// import React, { FC } from "react";
// import { connect } from "react-redux";
// import LaunchComponent from "./LaunchComponent";
// import { Post } from "../../../types/Post";
// import { setLaunches } from "../../../state/actions/launchActions";
//
// interface LaunchContainerProps {
//   missionName: string;
//   dispatchSetLaunches: () => void;
// }
//
// const mapDispatchToProps = (dispatch: any) => ({
//   dispatchUpdatePost: (): void => dispatch(setLaunches()),
// });
//
// const PostContainer: FC<LaunchContainerProps> = ({
//   post,
//   dispatchUpdatePost,
// }: LaunchContainerProps): React.ReactElement => {
//   const handleUpdate = (id: number, post: Post) => {
//     dispatchUpdatePost(id, post);
//   };
//   return <PostComponent post={post} handleUpdate={handleUpdate} />;
// };
//
// export default connect(null, mapDispatchToProps)(PostContainer);
