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
