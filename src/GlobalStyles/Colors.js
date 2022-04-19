const Colors = {
  background: "#fff",
  card: "#f0f0f0",
  active: "blue",
  foreground: "black",
  foreground2: "pink",
};

const getColor = (name) => {
  return Colors[name];
};

export { Colors, getColor };
