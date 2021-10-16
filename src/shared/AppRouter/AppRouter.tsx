
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { Vehicles } from '../../screens/Vehicles/Vehicles'
import AppSwitch from '../AppSwitch'
import { paths } from '../paths'

export const AppRouter: React.FC = () => {
  return (
      <BrowserRouter>
    <AppSwitch>
      <Route exact path={paths.error} component={()=><div>Error</div>} />
      <Route exact path={paths.general.notFound} component={()=><div>Not found</div>} />
      <Route exact path={paths.general.styleSamples} component={()=><div>Style</div>} />
      <Route exact path={paths.general.validate} component={()=><div>Validate</div>} />

        <Sidebar headerName="Vehicles">
      <Route exact path={paths.general.home} component={()=><div>Home</div>} />
      <Route exact path={paths.vehicles.default} component={Vehicles} />
      </Sidebar>
    </AppSwitch>
    </BrowserRouter>
  )
}