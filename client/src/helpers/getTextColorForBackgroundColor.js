const getTextColorForBackgroundColor = function (color) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (L > 179) {
    return "#000";
  } else {
    return "#fff";
  }
};

export default getTextColorForBackgroundColor;
