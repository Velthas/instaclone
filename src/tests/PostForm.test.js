import { screen, render } from "@testing-library/react";
import PostForm from "../components/instaclone/posts/postform/PostForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Post Form", () => {
  it("renders initial page correctly", () => {
    render(
      <MemoryRouter>
        <PostForm closeForm={""} />
      </MemoryRouter>
    );

    const header = screen.getByRole("heading", {
      target: { value: /create a new post/i },
    });
    const closeIcon = screen.getByTitle(/close form/i);
    const fileIcon = screen.getByAltText(/picture icon/i);
    const uploadFileImg = screen.getByRole("button", {
      name: /click here to upload from your device/i,
    });

    expect(fileIcon).toBeInTheDocument();
    expect(uploadFileImg).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
  });

  it("calls function to close form", () => {
    const closeFormMock = jest.fn();
    render(
      <MemoryRouter>
        <PostForm closeForm={closeFormMock} />
      </MemoryRouter>
    );

    const closeIcon = screen.getByTitle(/close form/i);
    userEvent.click(closeIcon);

    expect(closeFormMock).toHaveBeenCalledTimes(1);
  });

  it("displays error when file uploaded is not an image", async () => {
    const file = new File([""], "notanimage.txt", { type: "text/plain" });
    const closeFormMock = jest.fn();
    render(
      <MemoryRouter>
        <PostForm closeForm={closeFormMock} />
      </MemoryRouter>
    );

    const uploadButton = screen.getByText(
      /click here to upload from your device/i
    );
    const uploadFileImgLabel = screen.getByTestId("post");
    userEvent.upload(uploadFileImgLabel, file);
    const warningImg = await screen.findByAltText(/warning sign/i);

    expect(warningImg).toBeInTheDocument();
    expect(uploadButton.textContent).toMatch(/try uploading other files/i);
  });

  it("opens up post description menu when a photo is uploaded", async () => {
    const file = new File([""], "animage.png", { type: "image/png" });
    URL.createObjectURL = jest.fn().mockReturnValue("fakeimg");
    const closeFormMock = jest.fn();
    render(
      <MemoryRouter>
        <PostForm closeForm={closeFormMock} />
      </MemoryRouter>
    );

    const uploadFileImgLabel = screen.getByTestId("post");
    userEvent.upload(uploadFileImgLabel, file);

    const postDescriptionBox =
      screen.getByPlaceholderText(/add a description.../i);
    const emojiSign = screen.getByTitle(/emoji/i);
    const wordCount = screen.getByText(/0\/2200/i);
    const addLocation = screen.getByText(/add a location/i);
    const accessibility = screen.getByText(/accessibility/i);
    const backButton = await screen.findByTitle(/go back/i);
    const publishButton = await screen.findByText(/share/i);

    expect(postDescriptionBox).toBeInTheDocument();
    expect(emojiSign).toBeInTheDocument();
    expect(wordCount).toBeInTheDocument();
    expect(addLocation).toBeInTheDocument();
    expect(accessibility).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(publishButton).toBeInTheDocument();
  });

  it("goes back to image selection when back icon is clicked", async () => {
    const file = new File([""], "animage.png", { type: "image/png" });
    URL.createObjectURL = jest.fn().mockReturnValue("fakeimg");
    const closeFormMock = jest.fn();
    render(
      <MemoryRouter>
        <PostForm closeForm={closeFormMock} />
      </MemoryRouter>
    );

    const uploadFileImgLabel = screen.getByTestId("post");
    userEvent.upload(uploadFileImgLabel, file);
    const backIcon = await screen.findByTitle(/go back/i);
    userEvent.click(backIcon);
    const uploadImgButton = screen.getByRole("button", {
      name: /click here to upload from your device/i,
    });

    expect(uploadImgButton).toBeInTheDocument();
  });
});
