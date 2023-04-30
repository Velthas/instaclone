import { Timestamp } from "firebase/firestore"

export type FirebaseUser = {
  displayName: 'string',
};

export type InstaUser = {
  pfp: string,
  description: string,
  followed: string[],
  follows: string[],
  name: string, 
  username: string,
};

export type Post = {
  id: string,
  likedby: string[],
  username: string,
  timestamp: Timestamp,
  description: string,
  photo: string
};

export type PostInfo = {
  username: string,
  id: string,
}

export type Comments = {
  author: string,
  content: string,
  id: string,
  timestamp: Timestamp,
  likedby: string[]
};

export type ProfilePayload = {
  pfp?: string,
  description?: string,
  followed?: string[],
  follows?: string[],
  name?: string, 
};

export type Notifications = {
  type: "l" | "cl" | "f" | "c",
  author: string,
  content?: string,
  seen: boolean,
  poster?: string,
  postid?: string | number,
  commentid?: string,
  timestamp: Timestamp,
  id?: string,
};

export type ChatMessage = {
  author: string | null,
  content: string,
  timestamp: Timestamp
  id?: string,
};

export type Chatroom = {
  chatId: string,
  username: string,
  lastMessage?: ChatMessage | null,
};