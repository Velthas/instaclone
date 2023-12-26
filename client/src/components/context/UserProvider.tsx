import { InstaUser, Chatroom } from "../../utils/types";
import { createContext, useEffect } from "react";
import { useUser, useChatRooms } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { FirebaseUser } from "../../utils/types";

export type Context = {
  user: InstaUser | null;
  getUserData: (username: string) => void;
  rooms: Chatroom[] | null;
  hasNewMessages: boolean;
};

export const UserContext = createContext<Context | null>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: FirebaseUser | null;
  children: React.ReactNode;
}) => {
  const [userData, getUserData] = useUser(user ? user.displayName : null);
  const [rooms, hasNewMessages] = useChatRooms(user ? user : null);
  const navigate = useNavigate();

  // Triggers fetch when user info is finally loaded
  useEffect(() => {
    if (user) getUserData(user.displayName);
  }, [user]);

  // Brings the user to authentication if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user: userData, getUserData, rooms, hasNewMessages }}
    >
      {children}
    </UserContext.Provider>
  );
};
