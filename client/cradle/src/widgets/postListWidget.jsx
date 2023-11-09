import { setPosts } from "../state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./postWidget";

const PostListWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    const responseData = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await responseData.json();
    dispatch(setPosts({ posts: data })); 
  };

  const getUserPosts = async () => {
    const responseData = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await responseData.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getAllPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.from(posts).map(
        ({
          _id,
          userId,
          userName,
          userProfilePicture,
          postString,
          likes,
          postImage
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            userName={userName}
            userProfilePicture={userProfilePicture}
            postString={postString}
            likes={likes}
            postImage={postImage}
          />
        )
      )}
    </>
  );



};

export default PostListWidget;
