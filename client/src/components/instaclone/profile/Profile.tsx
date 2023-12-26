import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { useParams } from "react-router-dom";
import { InstaUser, Post } from "../../../utils/types";

import PostPreview from "../posts/PostPreview";
import ProfileHeader from "./ProfileHeader";
import ProfileSections from "./ProfileSections";
import MobileTop from "./MobileTop";
import FollowersFollowingModal from "./FollowersFollowingModal";

type Props = {
  user: InstaUser | null;
  posts: Post[] | [];
  closeSidebar: (section: string) => void;
};

const Profile = ({ user, posts, closeSidebar }: Props) => {
  const { username } = useParams();
  const isOwnProfile = getCurrentUserUsername() === username;
  const [followersModalOpen, setFollowersModalOpen] = useState<
    "" | "followers" | "following"
  >("");

  // Sets profile icon as activeì if visiting own profile
  useEffect(() => {
    if (isOwnProfile) closeSidebar("profile");
    else closeSidebar(" ");
  }, []);

  // Ensures followers modal is closed when switching profile
  useEffect(() => {
    setFollowersModalOpen("");
  }, [username]);

  return (
    <Container
      onClick={
        isOwnProfile ? () => closeSidebar("profile") : () => closeSidebar(" ")
      }
    >
      <FollowersFollowingModal
        followersModalOpen={followersModalOpen}
        setFollowersModalOpen={setFollowersModalOpen}
        user={user}
      />
      <MobileTop user={user} />
      <ProfileHeader
        user={user}
        posts={posts}
        setFollowersModalOpen={setFollowersModalOpen}
      />
      <ProfileSections />
      <PostList>
        {posts.map((post) => {
          return <PostPreview key={post.id} post={post} />;
        })}
      </PostList>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 5% 0;
  margin: 0 auto 30px;
  width: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    padding: 0 0 50px;
    margin: 0;
  }
`;

const PostList = styled.div`
  align-self: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;

  @media (max-width: 750px) {
    overflow: hidden;
    gap: 2px;
  }
`;

export default Profile;
