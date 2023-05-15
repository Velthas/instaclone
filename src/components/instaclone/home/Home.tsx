import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { getHomepageContent } from "../../../firebase/firestore";
import { flexColumnCenter } from "../../../styles/style";
import { FirebaseUser, Post } from "../../../utils/types";

import HomePost from "../posts/homepost/HomePost";
import Suggestions from "./Suggestions";
import LoadingPost from "../posts/LoadingPost";

type Props = {
  user: FirebaseUser;
  closeSidebar: (page: string) => void;
};

const Home = ({ user, closeSidebar }: Props) => {
  const [content, setContent] = useState<Post[] | any[]>([]);
  const [display, setDisplay] = useState(1);
  const [loading, setLoading] = useState(true);

  // Makes call to db to load homepage content.
  useEffect(() => {
    const loadContent = async () => {
      let posts;
      if (user) posts = await getHomepageContent(user.displayName);
      if (posts) setContent(posts);
      setLoading(false);
    };
    loadContent();
  }, [user]);

  // Implementation of infinite scrolling
  const observer = useRef<null | IntersectionObserver>(); // Preserves intersection observer reference
  const lastElementRef = useCallback(
    (node: Element) => {
      // Is called every time last post gets created
      if (loading) return; // Don't try to load more posts when already loading more
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer
      observer.current = new IntersectionObserver((entries) => {
        // Show more posts when last post scrolls into view && there are more posts to show
        if (entries[0].isIntersecting && display !== content.length - 1) {
          setLoading(true); // Will make loading placeholder post appear
          setTimeout(() => {
            // Gives the illusion of loading more posts, for now.
            setDisplay((prevState) => {
              return content.length - 1 < prevState + 2
                ? content.length - 1
                : prevState + 2;
            });
            setLoading(false); // Takes away the loading placeholder
          }, 1500);
        }
      });
      if (node) observer.current.observe(node); // Makes the observer watch last div
    },
    [loading, display, content]
  );

  return (
    <Container onClick={() => closeSidebar("home")}>
      <PostContainer>
        {content.length !== 0 &&
          content.map((post, index) => {
            if (index < display) return <HomePost key={post.id} post={post} />;
            else if (index === display)
              return (
                <HomePost innerRef={lastElementRef} key={post.id} post={post} />
              );
          })}
        {loading && <LoadingPost />}
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
  gap: 25px;

  @media (max-width: 950px) {
    flex-direction: column-reverse;
    align-items: center;
  }

  @media (max-width: 750px) {
    margin-top: 60px;
  }
`;

const PostContainer = styled.div`
  ${flexColumnCenter}
  padding: 30px 20px;
  gap: 10px;

  @media (max-width: 950px) {
    padding: 30px 0 0 0;
    margin-bottom: 49px;
  }

  @media (max-width: 550px) {
    width: 100%;
    padding-top: 16px;
  }
`;

export default Home;
