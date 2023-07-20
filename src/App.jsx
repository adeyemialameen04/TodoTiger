import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./Authentication/Auth";
import Todos from "./Todos/Todos";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;
