import React from "react";
import Buttons from "../components/instaclone/profile/Buttons";
import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe('Buttons', () => {
  it('Renders correct buttons when user viewing own profile', () => {
    render(<MemoryRouter><Buttons isFollowed={false} isOwnProfile={true}/></MemoryRouter>);

    const editProfileButton = screen.getByRole('button', {name: /edit profile/i});
    const addPostButton = screen.getByRole('button', {name: '+'});

    expect(editProfileButton).toBeInTheDocument();
    expect(addPostButton).toBeInTheDocument();
  });

  it('Renders correct buttons when user viewing other profiles', () => {
    render(<MemoryRouter><Buttons isFollowed={false} isOwnProfile={false}/></MemoryRouter>);

    const followButton = screen.getByRole('button', {name: /follow/i});
    const chatButton = screen.getByRole('button', {name: /chat/i});

    expect(followButton).toBeInTheDocument();
    expect(chatButton).toBeInTheDocument();
  });

  it('Renders Unfollow button when the user is followed', () => {
    render(<MemoryRouter><Buttons isFollowed={true} isOwnProfile={false}/></MemoryRouter>);

    const unfollowButton = screen.getByRole('button', {name: /unfollow/i});

    expect(unfollowButton).toBeInTheDocument();
  });
});

