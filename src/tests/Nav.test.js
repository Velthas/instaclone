import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/instaclone/sections/Nav";

describe("Userbar", () => {
  it("displays logo and icons", () => {
    render(<Nav />);

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
});
