import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { store } from "./store/store";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
    </BrowserRouter>
  );
}
