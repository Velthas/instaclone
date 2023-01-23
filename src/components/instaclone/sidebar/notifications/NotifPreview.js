import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPostInfo } from "../../../../firebase/firestore";

const NotifPreview = ({ postId, poster, toggleSidebar }) => {
  const [postPicture, setPostPicture] = useState("");
  useEffect(() => {
    const setup = async () => {
      const data = await getPostInfo(poster, postId);
      setPostPicture(data.photo); // We get post info and then set post picture in state
    };
    setup();
  }, []);

  return (
    <Link
      to={`/posts/${poster}/${postId}`}
      onClick={() => toggleSidebar("heart")}
    >
      <Image url={postPicture} />
    </Link>
  );
};

const Image = styled.div`
  height: 44px;
  width: 44px;
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
  margin-left: 10px;
`;

export default NotifPreview;
