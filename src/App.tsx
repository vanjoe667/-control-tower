import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import OrdersPage from "./components/OrdersPage";
import Dashboard from "./components/Dashboard";
import OrderDetailsPage from "./components/OrderDetailsPage";
import TokenHandler from "./components/Handlers/TokenHandler";
import NotFoundPage from "./components/NotFoundPage";
import NavigatorInjector from "./NavigatorInjector";

const App = () => {

  return (
    <Router>
      <NavigatorInjector />
      <TokenHandler />
      <Dashboard>
        <Routes>
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Dashboard>
    </Router>
  );
};

export default App;
