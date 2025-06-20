import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
