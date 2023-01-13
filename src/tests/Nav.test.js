import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/instaclone/sections/Nav";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Navbar", () => {
  it("Displays logo and icons", () => {
    render(
      <MemoryRouter>
        <Nav user={{ displayName: "hi" }} />
      </MemoryRouter>
    );

    const Logo = screen.getByTitle("instalogo");
    const Home = screen.getByTitle("home");
    const Search = screen.getByTitle("search");
    const Add = screen.getByTitle("add");
    const Heart = screen.getByTitle("heart");
    const Burger = screen.getByTitle("burger");

    expect(Logo).toBeInTheDocument();
    expect(Home).toBeInTheDocument();
    expect(Search).toBeInTheDocument();
    expect(Add).toBeInTheDocument();
    expect(Heart).toBeInTheDocument();
    expect(Burger).toBeInTheDocument();
  });

  it("Sidebar opens with search option when search icon is clicked", async () => {
    render(
      <MemoryRouter>
        <Nav user={{ displayName: "hi" }} />
      </MemoryRouter>
    );

    const searchIcon = screen.getByTitle("search");
    userEvent.click(searchIcon);
    const Searchbar = screen.getByRole("heading", {level: 1, name: /search/i} );

    expect(Searchbar).toBeInTheDocument();
  });

  it("Sidebar opens with notification menu when notification icon is clicked", () => {
    render(
      <MemoryRouter>
        <Nav user={{ displayName: "hi" }} />
      </MemoryRouter>
    );

    const heartIcon = screen.getByTitle("heart");
    userEvent.click(heartIcon);
    const notifications = screen.getByText("Notifications");

    expect(notifications).toBeInTheDocument();
  });
});
