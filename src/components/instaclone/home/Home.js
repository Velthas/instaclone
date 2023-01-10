import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHomepageContent } from "../../../firebase/firestore";
import HomePost from "../posts/homepost/HomePost";

const Home = ({ user }) => {
  const [content, setContent] = useState([]);
  const [display, setDisplay] = useState(2);
  useEffect(() => {
    const loadContent = async () => {
      let posts = [];
      if (user) posts = await getHomepageContent(user.displayName);
      console.log(posts);
      setContent(posts);
    };
    loadContent();
  }, [user]);
  return (
    <div>
      {content.length !== 0 &&
        content.map((post) => <HomePost key={post.id} post={post} />)}
    </div>
  );
};

export default Home;
