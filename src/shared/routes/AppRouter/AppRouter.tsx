import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import AppSwitch from "../AppSwitch";
import { DocumentsRouter } from "../Documents";
import { paths } from "../paths";
import { UsersRouter } from "../UsersRouter";
import { VehiclesRouter } from "../VehiclesRouter";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppSwitch>
        <Route exact path={paths.error} component={() => <div>Error</div>} />
        <Route
          exact
          path={paths.general.notFound}
          component={() => <div>Not found</div>}
        />
        <Route
          exact
          path={paths.general.styleSamples}
          component={() => <div>Style</div>}
        />
        <Route
          exact
          path={paths.general.validate}
          component={() => <div>Validate</div>}
        />

        {/*CU-03 Registrar un nuevo vehículo*/}
        {/*CU-04 Editar Vehículo*/}
        {/* CU-05 Borrar Vehículo */}
        <Route
          path={paths.vehicles.default}
          component={() => <VehiclesRouter />}
        />
        <Route path={paths.users.default} component={() => <UsersRouter />} />
        <Route
          path={paths.documents.default}
          component={() => <DocumentsRouter />}
        />
        <Sidebar headerName="Home">
          <Route
            exact
            path={paths.general.home}
            component={() => <div>Home</div>}
          />
        </Sidebar>
      </AppSwitch>
    </BrowserRouter>
  );
};
