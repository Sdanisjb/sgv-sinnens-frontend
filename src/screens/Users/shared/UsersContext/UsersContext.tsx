import axios from "axios";
import React from "react";
import {
  config,
  IUsers,
  IUsersFromApi,
  IUsersToApi,
} from "../../../../shared/api";

export interface UsersContextValue {
  users: IUsers[];
  userSelected: IUsers | undefined;
  createUser: (Usersel: IUsersToApi) => void;
  updateUser: (User: IUsersToApi, DNI: number) => void;
  deleteUser: (DNI: number) => void;
  selectUser: (Usersel: IUsers | undefined) => void;
  loading: boolean;
  error: boolean;
}

const UsersContext = React.createContext<UsersContextValue | undefined>(
  undefined
);

const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = React.useState<IUsers[]>([]);
  const [userSelected, setuserSelected] = React.useState<IUsers | undefined>();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        axios.get<Array<IUsersFromApi>>(`${config.url}users`).then((res) => {
          const getUsers: Array<IUsersFromApi> = res.data;
          console.log(getUsers);
          setUsers(
            getUsers.map((element, index) => {
              const { DNI, nombres, apellidos, email } = element;
              return {
                DNI,
                key: `users-list-item-${DNI}`,
                nombres,
                apellidos,
                email,
              };
            })
          );
        });
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  const selectUser = (User: IUsers | undefined) => {
    setuserSelected(User);
  };
  /* CU - 11 Registrar Nuevo Empleado */
  const createUser = (user: IUsersToApi) => {
    axios
      .post<IUsersFromApi>(`${config.url}users`, {
        ...user,
        password: user.DNI,
      })
      .then((res) => {
        const { DNI, nombres, apellidos, email } = res.data;
        setUsers([
          ...users,
          {
            DNI: user.DNI,
            key: `users-list-item-${DNI}`,
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
          },
        ]);
      });
  };
  /* CU - 12 Editar Empleado */
  const updateUser = (user: IUsersToApi, DNI: number) => {
    axios.put<IUsersFromApi>(`${config.url}users/${DNI}`, user).then((res) => {
      setUsers([
        ...users.filter((userValue) => userValue.DNI !== DNI),
        { key: `users-list-item-${DNI}`, ...user },
      ]);
      setuserSelected(undefined);
    });
  };
  /* CU - 13 Eliminar  Empleado */
  const deleteUser = (DNI: number) => {
    setLoading(true);
    try {
      axios.delete(`${config.url}users/${DNI}`);
      setLoading(false);
      setUsers(users.filter((userValue) => userValue.DNI !== DNI));
      setuserSelected(undefined);
    } catch (err: unknown) {
      console.error(err);
      setError(true);
      setLoading(false);
      setuserSelected(undefined);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        error,
        loading,
        userSelected,
        selectUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

function useUsers(): UsersContextValue {
  const context = React.useContext(UsersContext);
  if (typeof context === "undefined") {
    throw Error("The context isn't defined");
  }
  return context;
}

export { UsersProvider, useUsers, UsersContext };
