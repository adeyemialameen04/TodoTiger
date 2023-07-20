import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./Authentication/Auth";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
