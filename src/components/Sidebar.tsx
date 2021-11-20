import { Menu } from "antd";
import "antd/dist/antd.css";
import {
  CarFilled,
  ToolFilled,
  CopyFilled,
  FolderOpenFilled,
  ClockCircleFilled,
  TeamOutlined,
} from "@ant-design/icons";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useHistory } from "react-router-dom";
import { paths } from "../shared/routes/paths";

type SidebarProps = {
  headerName: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, headerName }) => {
  const history = useHistory();
  return (
    <Layout>
      <Sider width={256} style={{ height: "100vh" }}>
        <Menu
          style={{ width: 256, height: "100vh" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.ItemGroup key="g1" title="Menú de Empleado">
            <Menu.Item key="item-1" icon={<CopyFilled />}>
              Registro Documentación
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Menú de Administrador">
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
            <Menu.Item key="item-4" icon={<FolderOpenFilled />}>
              Reg. de Mantenimientos
            </Menu.Item>
            <Menu.Item key="item-5" icon={<ToolFilled />}>
              Ver Mantenimientos
            </Menu.Item>
            <Menu.Item
              key="item-6"
              icon={<CopyFilled />}
              onClick={() => history.push(paths.documents.default)}
            >
              Actualizar Documentación
            </Menu.Item>
            <Menu.Item key="item-7" icon={<ClockCircleFilled />}>
              Conf. de Notificaciones
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#FFF",
            height: 48,
            fontSize: 14,
            lineHeight: "48px",
          }}
        >
          {headerName}
        </Header>
        <Content style={{ padding: 32 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
