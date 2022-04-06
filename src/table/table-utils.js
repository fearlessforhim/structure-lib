import genericSort from '/generic-compare.js';

export default function(sortKey) {
  let _sortFunction = (a, b) => {
    if (sortKey.column) {
      const ascending = sortKey.direction === `ASC`;
      return genericSort(ascending ? a : b, ascending ? b : a);
    }

    return null;
  }

  let sort = (d) => {
    d.sort((a, b) => {
      let aVal = a.data[sortKey.column];
      let bVal = b.data[sortKey.column];
      return _sortFunction(aVal, bVal);
    });
  }

  return {
    sort: sort
  }
}
