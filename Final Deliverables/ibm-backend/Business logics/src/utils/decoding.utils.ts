export const decode = (password: string): string => {
  return password
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 2))
    .join('');
};
