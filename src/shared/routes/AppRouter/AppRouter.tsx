import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { Login } from "../../../screens/Login/Login";
import { Notifications } from "../../../screens/Notifications/Notifications";
import { AuthProvider } from "../../AuthContext/AuthContext";
import AppSwitch from "../AppSwitch";
import { DocumentsRouter } from "../DocumentsRouter";
import { paths } from "../paths";
import { UsersRouter } from "../UsersRouter";
import { VehiclesMaintenancesRouter } from "../VehiclesMaintenancesRouter";
import { VehiclesRouter } from "../VehiclesRouter";

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
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
            path={[paths.vehicles.default, paths.maintenances.default]}
            component={() => <VehiclesMaintenancesRouter />}
          />
          <Route path={paths.users.default} component={() => <UsersRouter />} />
          <Route
            path={paths.documents.default}
            component={() => <DocumentsRouter />}
          />
          <Route
            path={paths.notifications.default}
            component={() => (
              <Sidebar headerName="Actualizar Notificaciones">
                <Notifications />
              </Sidebar>
            )}
          />
          <Route path={paths.root} component={() => <Login />} />
        </AppSwitch>
      </BrowserRouter>
    </AuthProvider>
  );
};
