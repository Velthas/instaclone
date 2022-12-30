import { screen, render} from "@testing-library/react";
import * as firestoreModule from "../firebase/firestore";
import * as authenticationModule from "../firebase/authentication";
import "@testing-library/jest-dom";
import HomePost from "../components/instaclone/posts/HomePost";
import userEvent from "@testing-library/user-event";

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
      comments: [{ author: "test", content: "hi!", timestamp: new Date() }],
    };
    firestoreModule.getUserInfo = jest.fn().mockReturnValue(fakeUser);
    firestoreModule.updateLikes = jest.fn();
    authenticationModule.getCurrentUserUsername = jest.fn().mockReturnValue('test')
    render(<HomePost post={fakePost} />);

    const fullName = await screen.findByText(/claptrap the deathtrap/i);
    const username = await screen.findByText(/@test/i);
    const userPfp = screen.getByAltText(/poster profile picture/);
    const postPicture = screen.getByAltText(/post picture/i);
    const likesIcon = screen.getByAltText(/heart/i);
    const commentIcon = screen.getByAltText(/speech bubble/i);
    const goToIcon = screen.getByAltText(/go-to/i);
    const shareIcon = screen.getByAltText(/share/i);
    const likesAmount = await screen.findByText('1 likes');
    const comment =  await screen.findByText("hi!");
    const commentInput = screen.getByRole("textbox");
    const sendCommentIcon = screen.getByAltText(/send-comment/i);
    const allContent = [
      fullName, username, userPfp,
      postPicture, likesIcon, commentIcon,
      goToIcon, shareIcon, likesAmount,
      comment, commentInput, sendCommentIcon,
    ];

    allContent.forEach((node) => expect(node).toBeInTheDocument());
  });

  it("Shows 'view all comments' when post has more than two comments", async () => {
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
      comments: [
      { author: "test", content: "hi!", timestamp: new Date() },
      { author: "test", content: "hello!", timestamp: new Date() },
      { author: "test", content: "heeeeeeello!", timestamp: new Date() }],
    };
    firestoreModule.getUserInfo = jest.fn().mockReturnValue(fakeUser);
    firestoreModule.updateLikes = jest.fn();
    authenticationModule.getCurrentUserUsername = jest.fn().mockReturnValue('test')
    render(<HomePost post={fakePost} />);

    const viewAllComments = await screen.findByText('View All Comments');

    expect(viewAllComments).toBeInTheDocument();
  });

  it("Only displays the two most recent comments", async () => {
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
      comments: [
      { author: "test", content: "hi!", timestamp: new Date() },
      { author: "test", content: "hello!", timestamp: new Date() },
      { author: "test", content: "heeeeeeello!", timestamp: new Date() }],
    };
    firestoreModule.getUserInfo = jest.fn().mockReturnValue(fakeUser);
    firestoreModule.updateLikes = jest.fn();
    authenticationModule.getCurrentUserUsername = jest.fn().mockReturnValue('test')
    render(<HomePost post={fakePost} />);

    const viewAllComments = await screen.findByText('View All Comments');
    const firstComment = await screen.findByText('hi!');
    const secondComment = await screen.findByText('hello!')

    expect(viewAllComments).toBeInTheDocument();
    expect(firstComment).toBeInTheDocument();
    expect(secondComment).toBeInTheDocument();
  });

  it("Correctly appends a comment", async () => {
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
      comments: [
      { author: "test", content: "hi!", timestamp: new Date() },
      { author: "test", content: "hello!", timestamp: new Date() },
      { author: "test", content: "heeeeeeello!", timestamp: new Date() }],
    };
    firestoreModule.getUserInfo = jest.fn().mockReturnValue(fakeUser);
    firestoreModule.updateLikes = jest.fn();
    authenticationModule.getCurrentUserUsername = jest.fn().mockReturnValue('test')
    render(<HomePost post={fakePost} />);

    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'hello there!');
    const sendIcon = screen.getByAltText(/send-comment/i);
    userEvent.click(sendIcon);

    expect(await screen.findByText('hello there!')).toBeInTheDocument();
  });

  it("Doesn't append an empty comment", async () => {
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
      comments: [
        { author: "test", content: "hi!", timestamp: new Date() },
        { author: "test", content: "hello!", timestamp: new Date() },
      ],
    };
    firestoreModule.getUserInfo = jest.fn().mockReturnValue(fakeUser);
    firestoreModule.updateLikes = jest.fn();
    authenticationModule.getCurrentUserUsername = jest.fn().mockReturnValue('test')
    render(<HomePost post={fakePost} />);

    const sendIcon = screen.getByAltText(/send-comment/i);
    userEvent.click(sendIcon);
    const viewAllComments = screen.queryByText('View All Comments');

    // If the comment is appended it will be the third, thus this should be displayed
    expect(viewAllComments).toBe(null);
  });
});
