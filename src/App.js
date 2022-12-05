import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import routerList from "./router/index";

function App() {
  return (
    <>
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/login"} replace />}
            ></Route>
            {routerList.map((route) => {
              const Component = route.component;
              return (
                <Route
                  path={route.path}
                  element={<Component></Component>}
                  key={route.path}
                >
                  {route.children &&
                    route.children.map((route) => {
                      const Component = route.component;
                      return (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={<Component></Component>}
                        ></Route>
                      );
                    })}
                </Route>
              );
            })}
            {/* <Route path='/login' element={<Login></Login>}></Route>
<Route path='/manage' element={<Manage></Manage>}></Route> */}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
