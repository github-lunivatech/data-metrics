import React from "react";
import { Layout } from "antd";

// import AppHeader from '../Header/public';

const { Content } = Layout;

const index = (props) => {
  return (
    <Layout id="app-layout">
      {/* <AppHeader /> */}
      <Layout>
        <Content
        // className="site-layout-background"
        // style={{
        //   padding: 24,
        //   margin: 0,
        //   // minHeight: 280,
        //   height: '100vh',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   display: 'flex'
        // }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default index;
