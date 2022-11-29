type TitleDescription = {
  title: string,
  description: string,
}

export const parseTitle = (boardTitle: string): TitleDescription => {
  return JSON.parse(boardTitle);
};

export const createTitle = (title: string, desc: string): string => {
  return JSON.stringify({ title: title, description: desc });
};