import { screen, render} from "@testing-library/react";
import PostForm from '../components/instaclone/posts/PostForm';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe('Post Form', () => {
  it('renders file input, textarea, header and close icon', () => {
    render(<PostForm closeForm={''} />)

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

  it('display an error when file input is left empty', () => {
    render(<PostForm closeForm={''} />);

    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'Well hi');
    const submitButton = screen.getAllByRole('button')[0];
    userEvent.click(submitButton);

    const errorPara = screen.getByText(/cannot upload a post without an image!/i)
    expect(errorPara).toBeInTheDocument();
  });

});
