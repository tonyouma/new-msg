import "./styles.css";
import MessageView from "./views/ChatView";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import Chat from "./views/dashboard/Chat";

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          {/* <MessageView /> */}
          <Chat />
        </div>
      </Provider>
    </Router>
  );
}
