interface PostingMember {
  username: string;
  name: string;
  image: string;
}

export interface Posting {
  id: string;
  poster: PostingMember;
  content: string;
  date: string;
}
