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
  // console.log("startIndex check", startIndex);
  for (i = startIndex; i < startIndex + 5; i++) {
    if (boardState[i][selectedCol]) {
      if (boardState[i][selectedCol] === stoneColor) checkFive++;
    }
  }

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

  for (i = startIndex; i < startIndex + 5; i++) {
    if (boardState[selectedRow][i]) {
      if (boardState[selectedRow][i] === stoneColor) checkFive++;
    }
  }
  //console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};
// TODO :  change name checkRightDescDiagoWinner
export const checkDescDiagonalWinner = (
  boardState,
  stoneColor,
  selectedRow,
  selectedCol,
  maxRow
) => {
  let minDiagRow = selectedRow;
  let minDiagCol = selectedCol;
  let maxDiagRow = selectedRow;
  let maxDiagCol = selectedCol;

  let startRowIndex;
  let startColIndex;
  let i, j;

  let checkFive = 0;
  //find min index
  while (minDiagRow - 1 >= 0 && minDiagCol - 1 >= 0) {
    minDiagRow -= 1;
    minDiagCol -= 1;
  }
  //console.log("minDiag Row ", minDiagRow, "minDiagCol", minDiagCol);
  //find max index;
  while (maxDiagRow + 1 < maxRow && maxDiagCol + 1 < maxRow) {
    maxDiagRow += 1;
    maxDiagCol += 1;
  }
  //console.log("maxDiagRow ", maxDiagRow, "maxDiagCol", maxDiagCol);
  for (i = minDiagRow, j = minDiagCol; ; i++, j++) {
    if (boardState[i][j] && boardState[i][j] === stoneColor) {
      startRowIndex = i;
      startColIndex = j;
      break;
    }
  }
  //console.log("startRowIndex ", startRowIndex, "startColIndex", startColIndex);
  for (
    i = startRowIndex, j = startColIndex;
    i < maxDiagRow && j < maxDiagCol;
    i++, j++
  ) {
    if (boardState[i][j] && boardState[i][j] === stoneColor) checkFive++;
  }
  //console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};
// TODO :  change name checkRightAsecDiagoWinner
export const checkAsecDiagoWinner = (
  boardState,
  stoneColor,
  selectedRow,
  selectedCol,
  maxRow
) => {
  let leftDiagRow = selectedRow;
  let leftDiagCol = selectedCol;
  let rightDiagRow = selectedRow;
  let rightDiagCol = selectedCol;

  let startRowIndex;
  let startColIndex;
  let i, j;

  let checkFive = 0;
  //find left bottom index
  while (leftDiagRow + 1 < maxRow && leftDiagCol - 1 >= 0) {
    leftDiagRow += 1;
    leftDiagCol -= 1;
  }
  //console.log("leftDiagRow ", leftDiagRow, "leftDiagCol", leftDiagCol);
  //find max index;
  while (rightDiagRow - 1 >= 0 && rightDiagCol + 1 < maxRow) {
    rightDiagRow -= 1;
    rightDiagCol += 1;
  }
  //console.log("rightDiagRow ", rightDiagRow, "rightDiagCol", rightDiagCol);
  for (i = leftDiagRow, j = leftDiagCol; ; i--, j++) {
    if (boardState[i][j] && boardState[i][j] === stoneColor) {
      startRowIndex = i;
      startColIndex = j;
      break;
    }
  }
  //console.log("startRowIndex ", startRowIndex, "startColIndex", startColIndex);
  for (
    i = startRowIndex, j = startColIndex;
    i >= rightDiagRow && j <= rightDiagCol;
    i--, j++
  ) {
    if (boardState[i][j] && boardState[i][j] === stoneColor) checkFive++;
  }
  //console.log("five check", checkFive);
  return checkFive === 5 ? true : false;
};
