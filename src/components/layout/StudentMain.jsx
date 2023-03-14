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

import { Affix, Layout } from "antd";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/favicon.png";
import Header from "./Header";

const { Header: AntHeader, Content } = Layout;

function StudentMain({ children }) {
  const [visible, setVisible] = useState(false);
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname, breadcrumbTitle } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout className={`layout-dashboard `}>
      <Layout className='ms-0'>
        {fixed ? (
          <Affix>
            <AntHeader
              className={`${fixed ? "ant-header-fixed" : ""} position-relative`}
            >
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                breadcrumbTitle={breadcrumbTitle}
              />
              <div
                className='brand position-absolute d-flex justify-content-start align-items-center'
                style={{
                  top: "50%",
                  left: "2rem",
                  transform: "translateY(-50%)",
                }}
              >
                <img src={logo} height={30} alt='' />
                <span className=' ms-3 fs-3 text-danger'>HUST</span>
              </div>
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader
            className={`${fixed ? "ant-header-fixed" : ""} position-relative`}
          >
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              breadcrumbTitle={breadcrumbTitle}
            />

            <div
              className='brand position-absolute d-flex justify-content-start align-items-center'
              style={{
                top: "50%",
                left: "2rem",
                transform: "translateY(-50%)",
              }}
            >
              <img src={logo} height={30} alt='' />
              <span className=' ms-3 fs-3 text-danger'>HUST</span>
            </div>
          </AntHeader>
        )}
        <Content className='content-ant'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default StudentMain;
