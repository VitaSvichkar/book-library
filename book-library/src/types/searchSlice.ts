export type QueryTypes = 'author' | 'category' | 'title';

export type InitValuesSearch = {
  keyword: string;
  queryType: QueryTypes;
};
