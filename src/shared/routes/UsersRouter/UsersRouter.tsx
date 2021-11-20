import React from "react";
import { Route } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { CreateUser } from "../../../screens/Users/CreateUser/CreateUser";
import { DeleteUser } from "../../../screens/Users/DeleteUser/DeleteUser";
import { UsersProvider } from "../../../screens/Users/shared/UsersContext/UsersContext";
import { UpdateUser } from "../../../screens/Users/UpdateUser/UpdateUser";
import { Users } from "../../../screens/Users/Users";
import AppSwitch from "../AppSwitch";
import { paths } from "../paths";

export const UsersRouter: React.FC = () => {
  return (
    <AppSwitch>
      <Sidebar headerName="Usuarios">
        <UsersProvider>
          <Route exact path={paths.users.default} component={Users} />
          <Route exact path={paths.users.create} component={CreateUser} />
          <Route exact path={paths.users.update} component={UpdateUser} />
          <Route exact path={paths.users.delete} component={DeleteUser} />
        </UsersProvider>
      </Sidebar>
    </AppSwitch>
  );
};
