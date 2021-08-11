import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store";
import "./styles.css";
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
