import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { CarFilled, ToolFilled, CopyFilled, FolderOpenFilled, ClockCircleFilled, TeamOutlined } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

type SidebarProps={
    headerName:string
}

export const Sidebar: React.FC<SidebarProps> = ({ children,headerName }) => {
  return (
<Layout>
    <Sider width={256}>
        
  <Menu
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
  >
      <Menu.ItemGroup key="g1" title="Menú de Empleado">
        <Menu.Item key="item-1" icon={<CopyFilled/>}>Registro Documentación</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g2" title="Menú de Administrador">
        <Menu.Item key="item-2" icon={<CarFilled/>}>Vehículos</Menu.Item>
        <Menu.Item key="item-3" icon={<TeamOutlined />}>Empleados</Menu.Item>
        <Menu.Item key="item-4" icon={<FolderOpenFilled />}>Reg. de Mantenimientos</Menu.Item>
        <Menu.Item key="item-5" icon={<ToolFilled />}>Ver Mantenimientos</Menu.Item>
        <Menu.Item key="item-6" icon={<CopyFilled/>}>Actualizar Documentación</Menu.Item>
        <Menu.Item key="item-7" icon={<ClockCircleFilled />}>Conf. de Notificaciones</Menu.Item>
      </Menu.ItemGroup>
  </Menu>
  </Sider>
  <Layout>
    <Header style={{backgroundColor:'#FFF',height:48}}>{headerName}</Header>
  <Content style={{padding:32}}>
  {children}
  </Content>
  </Layout>
  </Layout>
  );
}