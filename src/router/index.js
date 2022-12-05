import React from "react";

const routes = [
  {
    path: "/login",
    component: React.lazy(() => import("../pages/login")),
    meta: {
      title: "123",
    },
  },
  {
    path: "/message",

    component: React.lazy(() => import("../layout")),
    children: [
      {
        path: "order",
        component: React.lazy(() => import("../pages/order")),
      },
      {
        path: "lt",
        component: React.lazy(() => import("../pages/message")),
      },
    ],
  },
];
export default routes;
