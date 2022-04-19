import toastr from "toastr";

export const notify = ({ message, title, type }) => {
  return toastr[type](message, title);
};
