import { screen, render} from "@testing-library/react";
import PostForm from '../components/instaclone/posts/PostForm';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe('Post Form', () => {
  it('renders file input, textarea, header and close icon', () => {
    render(<PostForm closeForm={jest.fn()} />)

    const header = screen.getByRole('heading', { target: { value: /create post/i } });
    const closeIcon = screen.getByAltText(/close form/i)
    const fileInput = screen.getByAltText(/add photo icon/i);
    const textInput = screen.getByRole('textbox');

    expect(fileInput).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
  });

  it('function to close form is called', () => {
    const closeFormMock = jest.fn()
    render(<PostForm closeForm={closeFormMock} />);

    const closeIcon = screen.getByAltText(/close form/i);
    userEvent.click(closeIcon);

    expect(closeFormMock).toHaveBeenCalledTimes(1);
  });

  it('display an error when description is left empty', async () => {
    const file = new File([""], "mock.png", { type: "image/png" });
    render(<PostForm closeForm={jest.fn()} />);

    const fileInput = screen.getByTestId('file');
    const submitButton = screen.getAllByRole('button')[0];
    userEvent.upload(fileInput, file);
    userEvent.click(submitButton);

    const errorPara = screen.getByText(/description can only contain 100 characters between alphabets, numbers and special characters if needed/i)
    expect(errorPara).toBeInTheDocument();
  });

  it('display an error when file input is left empty', () => {
    render(<PostForm closeForm={jest.fn()} />);

    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'Well hi');
    const submitButton = screen.getAllByRole('button')[0];
    userEvent.click(submitButton);

    const errorPara = screen.getByText(/there seems to be a problem with your file. ensure it is an image./i)
    expect(errorPara).toBeInTheDocument();
  });
});