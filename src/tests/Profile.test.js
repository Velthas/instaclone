import React from "react";
import { getByRole, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Profile from "../components/instaclone/profile/Profile";

describe('Profile', () => {
  it('renders content correctly', () => {
    render(<Profile username="damian" />);

    const backgroundImage = screen.getByRole('img');
    const profileImage = screen.getByAltText('profile picture');
    const button = screen.getByRole('button');
    const username = screen.getByText(/@damian/i);
    const name = screen.getByText(/damiano battaglia/i);
    const description = screen.getByText(/this is a description/i);
    const following = screen.getByText(100);
    const followedBy = screen.getByText(777);

    expect(backgroundImage).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
    expect(button.textContent).toBe(/follow/i);
    expect(username).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(following).toBeInTheDocument();
    expect(followedBy).toBeInTheDocument();
  });


  it('opens followed/follows list correctly', () => {
    render(<Profile username="damian" />);

    const following = screen.getByText(2);
    userEvent.click(following);
    const followingButton = getByRole('button', {name: /following/i});
    const followerButton = getByRole('button', {name: /followed by/i});
    //TODO: Hi.
  });
})
