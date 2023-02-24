import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as hooks from "../utils/hooks";
import * as auth from "../firebase/authentication"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FullPost from "../components/instaclone/posts/fullpost/FullPost";
import userEvent from "@testing-library/user-event";

describe("Full Post", () => {
  it("displays all information in a post", async () => {
    const fakeUser = {
      username: "test",
      name: "Test Testington",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "hi, I'm a description!",
    };
    hooks.useComments = jest.fn().mockReturnValue([[], jest.fn()]);
    hooks.usePost = jest
      .fn()
      .mockReturnValue([fakePost, fakeUser, true, jest.fn()]);
    hooks.useFollow = jest.fn().mockReturnValue([true, jest.fn()]);
    const closeSidebar = jest.fn();
    render(
      <MemoryRouter initialEntries={["/test/hi"]}>
        <Routes>
          <Route path=":username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
        </Routes>
      </MemoryRouter>
    );

    const [headUsername, descrUsername] = screen.getAllByText(/test/i);
    const userPfp = screen.getByTitle(/profile picture/i);
    const postPicture = screen.getByTitle(/post picture/i);
    const postDescription = screen.getByText(/hi, i'm a description!/i);
    const likesIcon = screen.getByTitle(/heart/i);
    const commentIcon = screen.getByTitle(/speech bubble/i);
    const goToIcon = screen.getByTitle(/go-to/i);
    const bookmarkIcon = screen.getByTitle(/bookmark/i);
    const likesAmount = await screen.findByText(/liked by 2 people/i);
    const sendText = screen.getByText(/publish/i);
    const date = screen.getByText(/january 1, 1970/i);
    const allContent = [
      headUsername,
      descrUsername,
      userPfp,
      postPicture,
      postDescription,
      likesIcon,
      commentIcon,
      goToIcon,
      bookmarkIcon,
      likesAmount,
      sendText,
      date,
    ];
    allContent.forEach((node) => expect(node).toBeInTheDocument());
  });

  it("displays comments (liked or otherwise) correctly", () => {
    const fakeUser = {
      username: "test",
      name: "Test Testington",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "description",
    };
    const fakeComments = [
      {
        author: "panampalmer",
        content: "hi",
        timestamp: { seconds: 10000 },
        likedby: ["test"],
        id: 1,
      },
      {
        author: "vincentgonk",
        content: "hey",
        timestamp: { seconds: 10000 },
        likedby: [],
        id: 3,
      },
    ];
    hooks.useComments = jest.fn().mockReturnValue([fakeComments, jest.fn()]);
    hooks.usePost = jest
      .fn()
      .mockReturnValue([fakePost, fakeUser, true, jest.fn()]);
    hooks.useFollow = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([{ pfp: "" }, jest.fn()]);
    const closeSidebar = jest.fn();
    render(
      <MemoryRouter initialEntries={["/test/hi"]}>
        <Routes>
          <Route path=":username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
        </Routes>
      </MemoryRouter>
    );

    const firstComment = screen.getByText(/hi/i);
    const firstLikeCount = screen.getByText(/liked by 1 person/i);
    const firstAuthor = screen.getByText(/panampalmer/i);
    const secondComment = screen.getByText(/hey/i);
    const secondAuthor = screen.getByText(/vincentgonk/i);

    expect(firstComment).toBeInTheDocument();
    expect(firstAuthor).toBeInTheDocument();
    expect(firstLikeCount).toBeInTheDocument();
    expect(secondComment).toBeInTheDocument();
    expect(secondAuthor).toBeInTheDocument();
  });

  it('function to add comment is called when \'publish\' is clicked', () => {
    const fakeUser = {
      username: "test",
      name: "Test Testington",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "description",
    };
    const sendComment = jest.fn();
    hooks.useComments = jest.fn().mockReturnValue([[], sendComment]);
    hooks.usePost = jest.fn().mockReturnValue([fakePost, fakeUser, true, jest.fn()]);
    hooks.useFollow = jest.fn().mockReturnValue([true, jest.fn()]);
    const closeSidebar = jest.fn();
    render(
      <MemoryRouter initialEntries={["/test/hi"]}>
        <Routes>
          <Route path=":username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
        </Routes>
      </MemoryRouter>
    );

    const textbox = screen.getByRole('textbox');
    userEvent.type(textbox, 'Hi, i am a comment');
    const publish = screen.getByRole('button', {name: 'Publish'});
    userEvent.click(publish);

    expect(sendComment).toHaveBeenCalledTimes(1);
  });

  it('post settings opened when three dots are clicked', () => {
    const fakeUser = {
      username: "test",
      name: "Test Testington",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "description",
    };
    hooks.useComments = jest.fn().mockReturnValue([[], jest.fn()]);
    hooks.usePost = jest.fn().mockReturnValue([fakePost, fakeUser, true, jest.fn()]);
    hooks.useFollow = jest.fn().mockReturnValue([true, jest.fn()]);
    auth.getCurrentUserUsername = jest.fn().mockReturnValue("test");
    const closeSidebar = jest.fn();
    render(
      <MemoryRouter initialEntries={["/test/hi"]}>
        <Routes>
          <Route path=":username/:postid" element={<FullPost closeSidebar={closeSidebar}/>} />
        </Routes>
      </MemoryRouter>
    );
    
    const dotIcon = screen.getByTitle("settings");
    userEvent.click(dotIcon);

    const share = screen.getByText("Copy Link");
    const url = screen.getByText("Share");
    const deleteText = screen.getByText("Delete");

    expect(share).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(deleteText).toBeInTheDocument();
  });
});
