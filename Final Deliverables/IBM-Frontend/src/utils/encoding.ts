export const encoding = (password: string): string => {
  return password
    .split('')
    .map((char) => {
      return String.fromCharCode(char.charCodeAt(0) + 2);
    })
    .join('');
};

export const decoding = (password: string): string => {
  return password
    .split('')
    .map((char) => {
      return String.fromCharCode(char.charCodeAt(0) - 2);
    })
    .join('');
};
