import { screen, render } from "@testing-library/react";
import * as hooks from "../utils/hooks";
import * as auth from "../firebase/authentication";
import "@testing-library/jest-dom";
import HomePost from "../components/instaclone/posts/homepost/HomePost";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Home Post", () => {
  it("displays a post correctly", async () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "I am a description",
    };
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([[], jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
      </MemoryRouter>
    );

    const [username] = await screen.findAllByText(/test/i);
    const description = screen.getByText(/i am a description/i)
    const userPfp = screen.getByTitle(/author profile picture/i);
    const postPicture = screen.getByTitle(/post picture/i);
    const likesIcon = screen.getByTitle(/heart/i);
    const commentIcon = screen.getByTitle(/speech bubble/i);
    const goToIcon = screen.getByTitle(/go-to/i);
    const bookmarkIcon = screen.getByTitle(/bookmark/i);
    const likesAmount = await screen.findByText(/liked by 2 people/i);
    const sendText = screen.getByText(/publish/i);

    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(userPfp).toBeInTheDocument();
    expect(postPicture).toBeInTheDocument();
    expect(likesIcon).toBeInTheDocument();
    expect(commentIcon).toBeInTheDocument();
    expect(goToIcon).toBeInTheDocument();
    expect(bookmarkIcon).toBeInTheDocument();
    expect(likesAmount).toBeInTheDocument();
    expect(sendText).toBeInTheDocument();
  });

  it("shows 'view all comments' when post has more than two", async () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "",
    };
    const fakeComments = [
      { author: "test", content: "hi!", timestamp: { seconds: 10000 } },
      { author: "test", content: "hello!", timestamp: { seconds: 10000 } },
      { author: "test", content: "foo!", timestamp: { seconds: 10000 } },
    ];
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([fakeComments, jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
      </MemoryRouter>
    );

    const viewAllComments = await screen.findByText(/show all 3 comments/i);

    expect(viewAllComments).toBeInTheDocument();
  });

  it("only displays the two most recent comments", async () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "",
    };
    const fakeComments = [
      { author: "test", content: "hi!", timestamp: { seconds: 10001 } },
      { author: "test", content: "hello!", timestamp: { seconds: 10002 } },
      {
        author: "test",
        content: "foo!",
        timestamp: { seconds: 10003 },
      },
    ];
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([fakeComments, jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
      </MemoryRouter>
    );

    const viewAllComments = await screen.findByText(/show all 3 comments/i);
    const firstComment = await screen.findByText("hi!");
    const secondComment = await screen.findByText("hello!");

    expect(viewAllComments).toBeInTheDocument();
    expect(firstComment).toBeInTheDocument();
    expect(secondComment).toBeInTheDocument();
  });

  it("calls function to insert comment when publish is clicked", async () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "",
    };
    const fakeComments = [
      { author: "test", content: "hi!", timestamp: { seconds: 10000 } },
      { author: "test", content: "hello!", timestamp: { seconds: 10000 } },
      { author: "test", content: "foo!", timestamp: { seconds: 10000 } },
    ];
    const addComment = jest.fn();
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([fakeComments, addComment]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
      </MemoryRouter>
    );

    const textInput = screen.getByRole("textbox");
    userEvent.type(textInput, "hello there!");
    const sendIcon = screen.getByText(/publish/i);
    userEvent.click(sendIcon);

    expect(addComment).toHaveBeenCalledTimes(1);
  });

  it("doesn't append an empty comment", async () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "",
    };
    const fakeComments = [
      { author: "test", content: "hi!", timestamp: { seconds: 10000 } },
      { author: "test", content: "hello!", timestamp: { seconds: 10000 } },
    ];
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([fakeComments, jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
      </MemoryRouter>
    );

    const sendIcon = screen.getByText(/publish/i);
    userEvent.click(sendIcon);
    const viewAllComments = screen.queryByText(/view all 3 comments/i);

    // If the comment is appended it will be the third, thus this shouldn't be displayed
    expect(viewAllComments).toBe(null);
  });

  it("opens up settings menu when three dots are clicked", () => {
    const fakeUser = {
      username: "test",
      name: "ClapTrap the DeathTrap",
      pfp: "",
      pbg: "",
    };
    const fakePost = {
      username: "test",
      photo: "",
      likedby: ["test"],
      comments: [],
      id: "hi",
      timestamp: { seconds: 10000 },
      description: "",
    };
    hooks.useLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    hooks.useComments = jest.fn().mockReturnValue([[], jest.fn()]);
    hooks.useUser = jest.fn().mockReturnValue([fakeUser, jest.fn()]);
    hooks.useCommentsLiked = jest.fn().mockReturnValue([true, jest.fn()]);
    auth.getCurrentUserUsername = jest.fn().mockReturnValue("test");
    render(
      <MemoryRouter>
        <HomePost post={fakePost} />
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
