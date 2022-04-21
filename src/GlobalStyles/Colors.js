const Colors = {
  background: "#131516",
  card: "#202324",
  active: "blue",
  foreground: "white",
  foreground2: "pink",
};

const getColor = (name) => {
  return Colors[name];
};

export { Colors, getColor };
