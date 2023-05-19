import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPostInfo } from "../../../../firebase/firestore";

type Props = {
  postId: string | number;
  poster: string;
  toggleSidebar: (section: string) => void;
};

const NotifPreview = ({ postId, poster, toggleSidebar }: Props) => {
  const [postPicture, setPostPicture] = useState("");

  useEffect(() => {
    const setup = async () => {
      if (typeof postId === "number") postId.toString();
      const data = await getPostInfo(poster, postId as string);
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

const Image = styled.div<{ url: string }>`
  height: 44px;
  width: 44px;
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
  margin-left: 10px;
`;

export default NotifPreview;
