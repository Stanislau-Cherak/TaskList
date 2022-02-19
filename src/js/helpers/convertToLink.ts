export function convertToLink(name: string): string {
  const tempArray = name.split(' ');
  return tempArray.join('_');
}