import toastr from "toastr";

const defaultOnClick = () => {};
// type: success, info, danger, warning
export const notify = ({ message, title, type, onClick = defaultOnClick }) => {
  toastr.options.onclick = onclick;
  return toastr[type](message, title);
};
