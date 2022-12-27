import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/instaclone/sections/Nav";
import { MemoryRouter } from "react-router-dom";

describe("Userbar", () => {
  it("displays logo and icons", () => {
    render(<MemoryRouter><Nav user={{displayName: 'hi'}}/></MemoryRouter>);

    const Logo = screen.getByAltText("instalogo");
    const Home = screen.getByAltText("home");
    const Profile = screen.getByAltText("profile");
    const Add = screen.getByAltText("add");
    const Heart = screen.getByAltText("heart");

    expect(Logo).toBeInTheDocument();
    expect(Home).toBeInTheDocument();
    expect(Profile).toBeInTheDocument();
    expect(Add).toBeInTheDocument();
    expect(Heart).toBeInTheDocument();
  });

  it("displays dropdown when user icon is clicked", () => {
    //TODO
  });
});
