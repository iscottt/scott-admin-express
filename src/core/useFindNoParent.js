function findNoParentItem(array) {
  const result = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].parentId === 0) {
      result.push(array[i]);
    }
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].parentId !== 0 && array[i].id === array[j].parentId) {
        result.push(array[j]);
      }
    }
  }
  return array.concat(result).filter((v, i, arr) => {
    return array.indexOf(v) === arr.lastIndexOf(v);
  });
}

module.exports = findNoParentItem;
