import React from "react";
import { screen, render } from "@testing-library/react";
import PostPreview from "../components/instaclone/posts/PostPreview";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import * as hooks from "../utils/hooks";
import { MemoryRouter } from "react-router-dom";

describe("PostPreview Component", () => {
  it("displays image correctly", () => {
    const mockPost = { likedby: [1, 2], photo: "url" };
    hooks.useComments = jest.fn().mockReturnValue([[1, 2], jest.fn()]);
    render(
      <MemoryRouter>
        <PostPreview post={mockPost} />
      </MemoryRouter>
    );

    const cardImage = screen.getByRole("img");
    expect(cardImage).toBeInTheDocument();
  });

  it("display correct number of comments and likes on hover", async () => {
    hooks.useComments = jest.fn().mockReturnValue([[1, 2, 3], jest.fn()]);

    const mockPost = {
      likedby: [1, 2, 3, 4, 5],
      photo: "url",
    };
    render(
      <MemoryRouter>
        <PostPreview post={mockPost} />
      </MemoryRouter>
    );

    const cardImage = screen.getByRole("img");
    userEvent.hover(cardImage);
    const likesCount = screen.getByText("5");
    const commentCount = await screen.findByText("3");

    expect(likesCount).toBeInTheDocument();
    expect(commentCount).toBeInTheDocument();
  });

  it("display 0 when there are no comments or likes",  async () => {
    const mockPost = { likedby: [], photo: "url" };
    hooks.useComments = jest.fn().mockReturnValue([[], jest.fn()]);
    render(
      <MemoryRouter>
        <PostPreview post={mockPost} />
      </MemoryRouter>
    );

    const cardImage = screen.getByRole("img");
    userEvent.hover(cardImage);
    const [likesCount, commentCount] = await screen.findAllByText("0");

    expect(likesCount).toBeInTheDocument();
    expect(commentCount).toBeInTheDocument();
  });
});
