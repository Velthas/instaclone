import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";


import Nav from "../components/instaclone/sections/Nav";

describe("Navbar", () => {
  it("Displays logo and icons", () => {
    render(
      <MemoryRouter>
        <Nav
          user={{ displayName: "hi" }}
          sidebar={false}
          setSidebar={jest.fn}
          active={" "}
          setActive={jest.fn}
        />
      </MemoryRouter>
    );

    const Logo = screen.getAllByTitle("instalogo")[1];
    const Home = screen.getByTitle("home");
    const Search = screen.getByTitle("search");
    const Direct = screen.getByTitle("direct messages");
    const Add = screen.getByTitle("add");
    const Heart = screen.getAllByTitle("heart")[1];
    const Burger = screen.getByTitle("burger");

    expect(Logo).toBeInTheDocument();
    expect(Home).toBeInTheDocument();
    expect(Search).toBeInTheDocument();
    expect(Add).toBeInTheDocument();
    expect(Direct).toBeInTheDocument();
    expect(Heart).toBeInTheDocument();
    expect(Burger).toBeInTheDocument();
  });

  it("When search is marked as active, search is displayed on sidebar", async () => {
    render(
      <MemoryRouter>
        <Nav
          user={{ displayName: "hi" }}
          sidebar={true}
          setSidebar={jest.fn}
          active={"search"}
          setActive={jest.fn}
        />
      </MemoryRouter>
    );

    const Searchbar = screen.getByRole("heading", {
      level: 1,
      name: /search/i,
    });

    expect(Searchbar).toBeInTheDocument();
  });

  it("When heart is marked as active, notifications are displayed on sidebar", () => {
    render(
      <MemoryRouter>
        <Nav
          user={{ displayName: "hi" }}
          sidebar={true}
          setSidebar={jest.fn}
          active={"heart"}
          setActive={jest.fn}
        />
      </MemoryRouter>
    );

    const notifications = screen.getByRole("heading", {
      level: 1,
      name: /notifications/i,
    });

    expect(notifications).toBeInTheDocument();
  });
});
