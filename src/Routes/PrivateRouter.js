import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const PrivateRouter = ({ component: Component, layout: Layout, forEdit,forGroup,forCon, secondaryNav, secondaryNavigation,showSider, ...rest }) => {
//   const dispatch = useDispatch();
//   const profileReducer = useSelector(state => state.profile);

  const checkAuthentication = () => {
    return true
  }

  return (
    <Route
      {...rest}
      render={props => (
        checkAuthentication() ? 
          <Layout secondaryNav={secondaryNav} secondaryNavigation={secondaryNavigation} showSider={showSider}>
              <Component forEdit={forEdit} forGroup={forGroup} forCon={forCon} {...props} showSider={showSider} />
          </Layout>
          :
          <Redirect to={{
            pathname: '/login'
          }} />
      )}
    />
  )
}

export default PrivateRouter;