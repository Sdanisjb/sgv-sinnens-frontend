import { Button, Menu } from "antd";
import "antd/dist/antd.css";
import {
  CarFilled,
  ToolFilled,
  CopyFilled,
  FolderOpenFilled,
  ClockCircleFilled,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useHistory } from "react-router-dom";
import { paths } from "../shared/routes/paths";
import { useState } from "react";
import { useAuth } from "../shared/AuthContext/AuthContext";

type SidebarProps = {
  headerName: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, headerName }) => {
  const history = useHistory();
  const [headerSize, setHeaderSize] = useState<number>(window.innerWidth - 256);
  const [contentSize, setContentSize] = useState<number>(
    window.innerHeight - 48
  );
  window.addEventListener("resize", () => {
    setHeaderSize(window.innerWidth - 256);
    setContentSize(window.innerHeight - 48);
  });

  const { logout, token } = useAuth();
  return (
    <Layout>
      <Sider width={256} style={{ height: "100vh", position: "fixed" }}>
        <Menu
          style={{ width: 256, height: "100vh", paddingTop: 16 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.ItemGroup key="g2" title={`Menú de ${token?.roles[0]}`}>
            <Menu.Item
              key="item-2"
              icon={<CarFilled />}
              onClick={() => history.push(paths.vehicles.default)}
            >
              Vehículos
            </Menu.Item>
            <Menu.Item
              key="item-3"
              icon={<TeamOutlined />}
              onClick={() => history.push(paths.users.default)}
            >
              Empleados
            </Menu.Item>
            <Menu.Item
              key="item-4"
              icon={<FolderOpenFilled />}
              onClick={() => history.push(paths.maintenances.default)}
            >
              Reg. de Mantenimientos
            </Menu.Item>
            <Menu.Item
              key="item-6"
              icon={<CopyFilled />}
              onClick={() => history.push(paths.documents.default)}
            >
              Actualizar Documentación
            </Menu.Item>
            <Menu.Item
              key="item-7"
              icon={<ClockCircleFilled />}
              onClick={() => history.push(paths.notifications.default)}
            >
              Conf. de Notificaciones
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 32,
            marginLeft: 256,
            marginTop: 48,
            minHeight: contentSize,
          }}
        >
          {children}
        </Content>
        <Header
          style={{
            marginLeft: 256,
            backgroundColor: "#FFF",
            height: 48,
            fontSize: 14,
            lineHeight: "48px",
            position: "fixed",
            width: headerSize,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div>{headerName}</div>
            <Button
              icon={<LogoutOutlined />}
              onClick={logout}
              style={{ border: 0 }}
            >
              Logout
            </Button>
          </div>
        </Header>
      </Layout>
    </Layout>
  );
};
