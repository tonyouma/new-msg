import { useRoutes } from "react-router-dom";
import Chat from "../views/dashboard/Chat";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "/chat", element: <Chat /> },
    { path: "/chat/new", element: <Chat /> },
    { path: "/chat/:conversationKey", element: <Chat /> },
  ]);
}
