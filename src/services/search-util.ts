import { Lo } from "./lo";

export function searchStrings(los: Lo[]) {
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach(lo => {
    result.push(`<a href="${lo.route}"><icon type="${lo.type}" size="fa-lg"></icon> ${lo.title} ${lo.summary} </a>`);
  });
  return result;
}

function flattenNestedLosArrays(los: Lo[]) {
  return flatten(los);
}

function flatten(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value.los)) {
      flatten(value.los, result);
    } else {
      result.push(value);
    }
  }
  return result;
}
