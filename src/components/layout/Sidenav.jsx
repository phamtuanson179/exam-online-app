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

// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { MenuOutlined } from "@ant-design/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className='brand'>
        <img src={logo} alt='' />
        <span>HUST</span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        <Menu.Item key='1'>
          <NavLink to='/dashboard'>
            <span
              className='icon'
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='2'>
          <NavLink to='/user'>
            <span
              className='icon'
              style={{
                background: page === "user" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Quản lý tài khoản</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='3'>
          <NavLink to='/subject'>
            <span
              className='icon'
              style={{
                background: page === "subject" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Quản lý môn học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='4'>
          <NavLink to='/classroom'>
            <span
              className='icon'
              style={{
                background: page === "classroom" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Quản lý lớp học</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='5'>
          <NavLink to='/question'>
            <span
              className='icon'
              style={{
                background: page === "question" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Quản lý câu hỏi</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='6'>
          <NavLink to='/exam'>
            <span
              className='icon'
              style={{
                background: page === "exam" ? color : "",
              }}
            >
              <MenuOutlined />
            </span>
            <span className='label'>Quản lý đề thi</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
