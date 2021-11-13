import axios from "axios";
import React from "react";
import { IUsers, IUsersFromApi, IUsersToApi } from "../../../../shared/api";

//import { User } from '../../shared/api'
//import { client } from '../../shared/client'

export interface UsersContextValue {
  users: IUsers[];
  userSelected: IUsers | undefined;
  createUser: (Usersel: IUsersToApi) => void;
  updateUser: (User: IUsersToApi, id: number) => void;
  deleteUser: (id: number) => void;
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
        axios
          .get<Array<IUsersFromApi>>(
            `https://quiet-eyrie-82714.herokuapp.com/api/users`
          )
          .then((res) => {
            const getUsers: Array<IUsersFromApi> = res.data;
            console.log(getUsers);
            setUsers(
              getUsers.map((element, index) => {
                const { id, placa, categoria, usuario, unidad, anho, marca } =
                  element;
                return {
                  id,
                  key: `Users-list-item-${id}`,
                  placa,
                  categoria,
                  usuario,
                  unidad,
                  anho,
                  marca,
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

  const createUser = (User: IUsersToApi) => {
    axios
      .post<IUsersFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/Users`,
        User
      )
      .then((res) => {
        const { id, placa, categoria, usuario, unidad, anho, marca } = res.data;
        setUsers([
          ...users,
          {
            id,
            key: `users-list-item-${id}`,
            placa,
            categoria,
            usuario,
            unidad,
            anho,
            marca,
          },
        ]);
      });
  };

  const updateUser = (user: IUsersToApi, id: number) => {
    axios
      .put<IUsersFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/Users/${id}`,
        user
      )
      .then((res) => {
        setUsers([
          ...users.filter((userValue) => userValue.id !== id),
          { id, key: `users-list-item-${id}`, ...user },
        ]);
      });
  };
  const deleteUser = (id: number) => {
    setLoading(true);
    try {
      axios.delete(`https://quiet-eyrie-82714.herokuapp.com/api/Users/${id}`);
      setLoading(false);
      setUsers(users.filter((userValue) => userValue.id !== id));
    } catch (err: unknown) {
      console.error(err);
      setError(true);
      setLoading(false);
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
