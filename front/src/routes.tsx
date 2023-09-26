import AuthGuard from "./components/authentication/AuthGuard";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import GuestGuard from "./components/authentication/GuestGuard";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

// user management
const UserList = Loadable(
  lazy(() => import("./pages/userManagement/UserList"))
);
const UserGrid = Loadable(
  lazy(() => import("./pages/userManagement/UserGrid"))
);
const AddNewUser = Loadable(
  lazy(() => import("./pages/userManagement/AddNewUser"))
);

// training management
const TrainingList = Loadable(
  lazy(() => import("./pages/trainingManagement/TrainingList"))
);
const AddNewTraining = Loadable(
  lazy(() => import("./pages/trainingManagement/AddNewTraining"))
);

// error
const Error = Loadable(lazy(() => import("./pages/404")));

// routes
const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },

      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "add-user",
        element: <AddNewUser />,
      },
      {
        path: "training-list",
        element: <TrainingList />,
      },
      {
        path: "add-training",
        element: <AddNewTraining />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
