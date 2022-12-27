import React from "react";
import { screen, render} from "@testing-library/react";
import PostPreview from "../components/instaclone/posts/PostPreview";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe('PostPreview Component', () => {
  it('displays image correctly', () => {
    const mockPost = {comments: [1, 2], likedby: [1,2], photo: 'url'};
    render(<PostPreview post={mockPost}/>);

    const cardImage = screen.getByRole('img');
    expect(cardImage).toBeInTheDocument();
  });

  it('display correct number of comments and likes on hover', () => {
    const mockPost = {comments: [1, 2, 3], likedby: [1,2,3,4,5], photo: 'url'};
    render(<PostPreview post={mockPost}/>);

    const cardImage = screen.getByRole('img');
    userEvent.hover(cardImage);
    const likesCount = screen.getByText('5');
    const commentCount = screen.getByText('3');

    expect(likesCount).toBeInTheDocument();
    expect(commentCount).toBeInTheDocument();
  });

  it('display 0 when there are no comments or likes', () => {
    const mockPost = {comments: [], likedby: [], photo: 'url'};
    render(<PostPreview post={mockPost}/>);

    const cardImage = screen.getByRole('img');
    userEvent.hover(cardImage);
    const [likesCount, commentCount] = screen.getAllByText('0');

    expect(likesCount).toBeInTheDocument();
    expect(commentCount).toBeInTheDocument();
  });
});

