import React from 'react'
import { Breadcrumb, Layout, Menu, theme ,Image} from 'antd';
import Link from 'next/link';
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react';
const { Header, Content, Footer } = Layout;
import Stock from '@/components/Stock';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);
  
const Watchlist = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <ChakraProvider>
    <div>
        <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div style={{ float: 'left', paddingRight: '50px' }}>
          <Image src="/Rlogobg.png" preview={false} width={50} />
        </div>
        
        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={['4']}>
          <Menu.Item style={{ padding:'0px 8%'}} key="1">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="2">
            <Link href="/wallet">Wallet</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="3">
            <Link href="/Goals">Goals</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="4">
            <Link href="/watchlist">Watchlist</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="5">
            <Link href="/Profile">Profile</Link>
          </Menu.Item>
        </Menu>

      </Header>
      <Content className="site-layout" style={{ padding: '24px', background: '#141414', color: '#fff' }}>
          <h1 style={{ color: '#fff' }}>Universal Wallet</h1>
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab>All</Tab>
              <Tab>Equity</Tab>
              <Tab>Crypto</Tab>
        
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <Stock />
              </TabPanel>
              <TabPanel>
                <p>c</p>
              </TabPanel>
            </TabPanels>
            
            
          </Tabs>
        </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: '#000',
          color:'#fff'
          
        }}
      >
        RichIN ©2023 lorem ipsum
      </Footer>
    </Layout>
    </div>
    </ChakraProvider>
  )
}

export default Watchlist