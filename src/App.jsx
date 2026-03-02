import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Menu from "./pages/menu";
import Info from "./pages/info";

const App = () => {

      return (
            <>
                  <Router>
                        <Routes>
                              <Route path="/" element={<Menu />} />
                              <Route path="/info" element={<Info />} />
                        </Routes>
                  </Router>
            </>
      );
};

export default App
