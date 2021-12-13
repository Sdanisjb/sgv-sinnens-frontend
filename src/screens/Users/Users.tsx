/* React-Component Users
Implementacion de la clase Panel Usuario
Por defecto retorna el renderizado de la pantalla Users
Interactua con el controlador Usuario para poder acceder a los metodos:
- getUsers
- createUser
- updateUser
- deleteUser
*/

import { Button, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUsers } from "./shared/UsersContext/UsersContext";
import { IUsers, IUsersFromApi } from "../../shared/api";
import { DeleteUser } from "./DeleteUser/DeleteUser";
import { paths } from "../../shared/routes/paths";
import FilterDni from "../../shared/filters/FilterDni";
import FilterWords from "../../shared/filters/FilterWords";

const columns = [
  {
    title: "DNI",
    dataIndex: "DNI",
    key: "DNI",
    sorter: (a: IUsers, b: IUsers) => a.DNI - b.DNI,
    filterDropdown: FilterDni,
    onFilter: (value: string | number | boolean, record: IUsers) =>
      record.DNI.toString().includes(value.toString()),
  },
  {
    title: "Apellido",
    dataIndex: "apellidos",
    key: "apellidos",
    sorter: (a: IUsers, b: IUsers) =>
      a.apellidos.charCodeAt(0) * 10000 -
      b.apellidos.charCodeAt(0) * 10000 +
      (a.apellidos.charCodeAt(1) * 100 - b.apellidos.charCodeAt(1) * 100) +
      (a.apellidos.charCodeAt(2) - b.apellidos.charCodeAt(2)),
    filterDropdown: FilterWords,
    onFilter: (value: string | number | boolean, record: IUsers) =>
      record.apellidos
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  },
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
    sorter: (a: IUsers, b: IUsers) =>
      a.nombres.charCodeAt(0) * 10000 -
      b.nombres.charCodeAt(0) * 10000 +
      (a.nombres.charCodeAt(1) * 100 - b.nombres.charCodeAt(1) * 100) +
      (a.nombres.charCodeAt(2) - b.nombres.charCodeAt(2)),
    filterDropdown: FilterWords,
    onFilter: (value: string | number | boolean, record: IUsers) =>
      record.nombres
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a: IUsers, b: IUsers) =>
      a.email.charCodeAt(0) * 10000 -
      b.email.charCodeAt(0) * 10000 +
      (a.email.charCodeAt(1) * 100 - b.email.charCodeAt(1) * 100) +
      (a.email.charCodeAt(2) - b.email.charCodeAt(2)),
    onFilter: (value: string | number | boolean, record: IUsers) =>
      record.email
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  },
];

export const Users: React.FC = () => {
  const { users, selectUser, userSelected } = useUsers();

  const history = useHistory();
  /* CU - 11 Registrar Nuevo Empleado */
  function newUser() {
    history.push(paths.users.create);
  }
  /* CU - 12 Editar Empleado */
  function updateUser() {
    history.push(paths.users.update);
  }
  function selectRow(selectedRowKeys: React.Key[], selectedRows: IUsers[]) {
    selectUser(selectedRows[0]);
  }
  return (
    <>
      <StyledUpperButtons>
        <Button type="primary" onClick={newUser}>
          Nuevo Empleado
        </Button>
      </StyledUpperButtons>
      <Table
        rowSelection={{ type: "radio", onChange: selectRow }}
        dataSource={users}
        columns={columns}
      />
      {userSelected ? (
        <StyledBottomButtons>
          <DeleteUser />
          {/* CU - 12 Editar Empleado */}
          <Button type="default" onClick={updateUser}>
            Editar Empleado
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          {/* CU - 13 Eliminar  Empleado */}
          <Button type="dashed" disabled>
            Eliminar Empleado
          </Button>
          {/* CU - 12 Editar Empleado */}
          <Button type="dashed" disabled>
            Editar Empleado
          </Button>
        </StyledBottomButtons>
      )}
    </>
  );
};

const StyledUpperButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`;
const StyledBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 16px;
`;
