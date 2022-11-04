/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import { Space, Spin } from "antd";

ReactDOM.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <Space
          style={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <Spin size='large' />
        </Space>
      }
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
