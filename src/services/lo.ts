export interface Lo {
  title: string;
  type: string;
  folder: string;
  link: string;
  img: string;
  videoid: string;
  objectives: string;
  los: Lo[];
  topics: Lo[];
  properties: { [prop: string]: string };
}
