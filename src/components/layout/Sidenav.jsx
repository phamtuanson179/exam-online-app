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
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/favicon.png";
import { ROLE } from "constants/types";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const rawData = localStorage.getItem("currentUser");
    if (rawData) {
      const currentUser = JSON.parse(rawData);
      setCurrentUser(currentUser);
    }
  }, []);

  return (
    <>
      <div className='brand'>
        <img src={logo} />
        <span className=" ms-3 fs-4 text-danger">HUST</span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        {/* dashboard  */}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item className='menu-item-header'>
            Dashboard
          </Menu.Item>
        )}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item>
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
        )}

        {/* user  */}
        {currentUser?.role === ROLE.ADMIN.code && (
          <Menu.Item className='menu-item-header' >
            Người dùng
          </Menu.Item>
        )}
        {currentUser?.role === ROLE.ADMIN.code && (
          <Menu.Item>
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
        )}

        {/* classroom && subject  */}
        {(currentUser?.role === ROLE.ADMIN.code ||
          currentUser?.role === ROLE.TEACHER.code )&& (
            <Menu.Item className='menu-item-header' >
              Lớp học
            </Menu.Item>
          )}
        {currentUser?.role === ROLE.ADMIN.code && (
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
        )}
        {currentUser?.role === ROLE.ADMIN.code ||
        currentUser?.role === ROLE.TEACHER.code ? (
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
        ) : null}

        {/* exam && question */}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item className='menu-item-header' >
            Đề thi
          </Menu.Item>
        )}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item >
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
        )}

        {currentUser?.role === ROLE.TEACHER.code && (
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
        )}

        {/* history  */}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item className='menu-item-header' >
            Lịch sử thi
          </Menu.Item>
        )}
        {currentUser?.role === ROLE.TEACHER.code && (
          <Menu.Item key='6'>
            <NavLink to='/result'>
              <span
                className='icon'
                style={{
                  background: page === "result" ? color : "",
                }}
              >
                <MenuOutlined />
              </span>
              <span className='label'>Quản lý lịch sử thi</span>
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}

export default Sidenav;
