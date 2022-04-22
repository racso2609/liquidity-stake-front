import toastr from "toastr";
// type: success, info, danger, warning
export const notify = ({ message, title, type }) => {
  return toastr[type](message, title);
};
