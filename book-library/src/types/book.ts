export type VolumeInfo = {
  authors: string[];
  categories: string[];
  description: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  pageCount: number;
  previewLink: string;
  publishedDate: string;
  publisher: string;
  title: string;
};

export type Book = {
  id: string;
  isAdded: boolean;
  isFavorite: boolean;
  isFinished: boolean;
  progress: number;
  review: string;
  grade: number | null;
  status: StatusValues;
  volumeInfo: VolumeInfo;
};

export type StatusValues = 'reading' | 'completed' | '';
