import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHomepageContent } from "../../../firebase/firestore";
import { flexColumnCenter } from "../../../styles/style";
import HomePost from "../posts/homepost/HomePost";
import Suggestions from "./Suggestions";

const Home = ({ user, closeSidebar }) => {
  const [content, setContent] = useState([]);
  const [display, setDisplay] = useState(2);
  useEffect(() => {
    const loadContent = async () => {
      let posts = [];
      if (user) posts = await getHomepageContent(user.displayName);
      setContent(posts);
    };
    loadContent();
  }, [user]);

  return (
    <Container onClick={() => closeSidebar("home")}>
      <PostContainer>
        {content.length !== 0 &&
          content.map((post) => <HomePost key={post.id} post={post} />)}
      </PostContainer>
      <Suggestions currentUser={user} />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fafafa;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  ${flexColumnCenter}
  padding: 30px 20px;
  gap: 10px;
`;

export default Home;
