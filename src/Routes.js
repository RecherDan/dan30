import React, {useContext} from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {MyContext} from 'App';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <MyContext.Consumer>
      {(context) => (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/items"
      />
      <PrivateRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/carpool"
      />
      <PrivateRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/menu"
      />
      <PrivateRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/logout"
      />
      <LoggedInRoute
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <LoggedInRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
        )}
    </MyContext.Consumer>
  );
};
function PrivateRoute({ path, ...rest }) {
  const contextValue = useContext(MyContext);
  if (contextValue.loggedIn ) {
    if ( path === "/logout" ) {
      contextValue.logoutFunction();
      return(<RouteWithLayout
        path="/sign-in" {...rest}
      />);
    }
    return(<RouteWithLayout
      path={path} {...rest}
    />);
  }
  else {
    contextValue.setlastpageFunction(path);
    return (<Redirect to="/sign-in" />);
  }
}
function LoggedInRoute({  ...rest }) {
  const contextValue = useContext(MyContext);
  if (!contextValue.loggedIn ) {
    return(<RouteWithLayout
      {...rest}
    />);
  }
  else {
    return (<Redirect to="/dashboard" />);
  }
}
export default Routes;
