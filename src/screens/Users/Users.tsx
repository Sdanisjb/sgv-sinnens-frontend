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
    title: "Dni",
    dataIndex: "dni",
    key: "dni",
  },
  {
    title: "Apellido",
    dataIndex: "apellido",
    key: "apellido",
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
  },
];

export const Users: React.FC = () => {
  const { users, selectUser, userSelected } = useUsers();

  const history = useHistory();
  //CU-03 Registrar un nuevo vehículo
  function newUser() {
    history.push(paths.users.create);
  }
  /*CU-04 Editar Vehículo*/
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
          Nuevo Vehiculo
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
            Editar Vehiculo
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          <Button type="dashed" disabled>
            Eliminar Vehiculo
          </Button>
          <Button type="dashed" disabled>
            Editar Vehiculo
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
