import { Button, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUsers } from "./shared/UsersContext/UsersContext";
import { IUsers } from "../../shared/api";
import { DeleteUser } from "./DeleteUser/DeleteUser";
import { paths } from "../../shared/routes/paths";
//"placa" : "ABC-123", "categoria" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const columns = [
  {
    title: "DNI",
    dataIndex: "DNI",
    key: "DNI",
  },
  {
    title: "Apellido",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

export const Users: React.FC = () => {
  const { users, selectUser, userSelected } = useUsers();

  const history = useHistory();
  function newUser() {
    history.push(paths.users.create);
  }
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
          <Button type="default" onClick={updateUser}>
            Editar Empleado
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          <Button type="dashed" disabled>
            Eliminar Empleado
          </Button>
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
