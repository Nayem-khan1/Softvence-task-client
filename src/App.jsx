import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import PublicRoute from "./routes/PublicRoute";
import NotFound from "./pages/NotFound";
import TaskDetails from "./pages/TaskDetails";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <MainLayout>
                  <TaskDetails/>
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
           path="*"
           element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
