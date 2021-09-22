import logo from "./logo.svg";
import "./App.css";
import FriendList from "./components/FriendList";
import { reactLocalStorage } from "reactjs-localstorage";
import Pagination from "./components/Pagination";

const App = () => {
  // const userExists = reactLocalStorage.getObject("users", [], true);

  return (
    <div className="App">
      <FriendList />
    </div>
  );
};

export default App;
