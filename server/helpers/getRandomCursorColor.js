const cursorColors = [
  "#088395",
  "#37B7C3",
  "#B1AFFF",
  "#973131",
  "#E0A75E",
  "#F19ED2",
  "#4C3BCF",
  "#4B70F5",
  "#3DC2EC",
  "#91DDCF",
  "#5A639C",
  "#219C90",
  "#FFC700",
  "#EE4E4E",
  "#FF6969",
  "#C80036",
  "#1679AB",
  "#059212",
  "#06D001",
  "#9BEC00",
  "#F3FF90",
  "#55AD9B",
  "#EF9C66",
  "#78ABA8",
  "#BC5A94",
  "#FFDB00",
  "#FFEEA9",
  "#DC5F00",
  "#FF0000",
  "#850F8D",
];

const getRandomCursorColor = function () {
  let index = Math.floor(Math.random() * 30);

  return cursorColors[index];
};

module.exports = getRandomCursorColor;
