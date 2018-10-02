export const checkVerticalWinner = (
  boardState,
  stoneColor,
  selectedRow,
  selectedCol,
  maxRow
) => {
  // 현재 board state, 선택된 곳, size 받아옴.
  const minRowIndex = selectedRow - 5 < 0 ? 0 : selectedRow - 5;
  const maxRowIndex = selectedRow + 5 > maxRow ? maxRow : selectedRow + 5;

  let i;
  let startIndex;
  let checkFive = 0;
  //console.log("selectedRow", selectedRow, "minRowIndex", minRowIndex);
  for (i = minRowIndex; i < maxRowIndex; i++) {
    if (boardState[i][selectedCol]) {
      if (boardState[i][selectedCol] === stoneColor) {
        startIndex = i;
        break;
      }
    }
  }
  console.log("startIndex check", startIndex);
  for (i = startIndex; i < startIndex + 5; i++) {
    if (boardState[i][selectedCol]) {
      if (boardState[i][selectedCol] === stoneColor) checkFive++;
    }
  }
  console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};

export const checkHorizontalWinner = (
  boardState,
  stoneColor,
  selectedRow,
  selectedCol,
  maxRow
) => {
  // 현재 board state, 선택된 곳, size 받아옴.
  const minColIndex = selectedCol - 5 < 0 ? 0 : selectedCol - 5;
  const maxColIndex = selectedCol + 5 > maxRow ? maxRow : selectedCol + 5;

  let i;
  let startIndex;
  let checkFive = 0;
  //console.log("selectedRow", selectedRow, "minRowIndex", minRowIndex);
  for (i = minColIndex; i < maxColIndex; i++) {
    if (boardState[selectedRow][i]) {
      if (boardState[selectedRow][i] === stoneColor) {
        startIndex = i;
        break;
      }
    }
  }
  console.log("startIndex check", startIndex);
  for (i = startIndex; i < startIndex + 5; i++) {
    if (boardState[selectedRow][i]) {
      if (boardState[selectedRow][i] === stoneColor) checkFive++;
    }
  }
  console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};

export const checkDiagonalWinner = (
  boardState,
  stoneColor,
  selectedRow,
  selectedCol,
  maxRow
) => {
  //직사각형 board라면 안될 로직.
  const minDiagIndex = selectedRow - 5 < 0 ? 0 : selectedRow - 5;
  const maxDiagIndex = selectedRow + 5 > maxRow ? 0 : selectedRow - 5;
  let i;
  let startIndex;
  let checkFive = 0;
  for (i = minDiagIndex; i < maxRow; i++) {
    if (boardState[i][i] && boardState[i][i] === stoneColor) {
      startIndex = i;
      break;
    }
  }
  for (i = startIndex; i < startIndex + 5; i++) {
    if (boardState[i][i] && boardState[i][i] === stoneColor) checkFive++;
  }
  console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};
