import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, layout: Layout }) => {
  return (
    <Route
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

export default PublicRoute;