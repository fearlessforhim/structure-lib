export default function genericSort(a, b) {

  const aIsNumber = !isNaN(a);
  const bIsNumber = !isNaN(b);

  if(aIsNumber && bIsNumber) {
    return a - b;
  } else if (aIsNumber && !bIsNumber){
    return -1;
  } else if (!aIsNumber && bIsNumber){
    return 1;
  }
  //both are non-numeric
  return (a || ``).localeCompare(b || ``);
}
