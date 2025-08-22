import HomePage from "../pages/home/HomePage";
import BillingReportPage from "../pages/billingReport/BillingReportPage";
import AlarmPage from "../pages/alarm/AlarmPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";

export const ROUTES = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
    icon: "home",
    layout: "app",
    showInNav: true,
  },
  {
    path: "/billing-report",
    element: <BillingReportPage />,
    label: "Billing Report",
    icon: "businessplan",
    layout: "app",
    showInNav: true,
  },
  {
    path: "/alarm",
    element: <AlarmPage />,
    label: "Alarm",
    icon: "alarm",
    layout: "app",
    showInNav: true,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    label: "Not Found",
    layout: "none",
    showInNav: false,
  },
];
