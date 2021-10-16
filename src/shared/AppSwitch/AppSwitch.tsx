
import React from 'react'
import { Switch, Route, SwitchProps, Redirect } from 'react-router-dom'
import { paths } from '../paths'

export const AppSwitch: React.FC<SwitchProps> = ({ children, ...props }) => {
  return (
    <Switch {...props}>
      {children}
      <Route render={() => <Redirect to={paths.general.notFound} />} />
    </Switch>
  )
}