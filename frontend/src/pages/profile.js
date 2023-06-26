import React from 'react'
import { Breadcrumb, Layout, Menu, theme ,Image} from 'antd';
import Link from 'next/link';
const { Header, Content, Footer } = Layout;

  
const Profile = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
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
        
        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={['5']}>
          <Menu.Item style={{ padding:'0px 8%'}} key="1">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="2">
            <Link href="/wallet">Wallet</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="3">
            <Link href="/goals">Goals</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="4">
            <Link href="/watchlist">Watchlist</Link>
          </Menu.Item>
          <Menu.Item style={{ padding:'0px 8%'}} key="5">
            <Link href="/Profile">Profile</Link>
          </Menu.Item>
        </Menu>

      </Header>
      <Content
        className="site-layout"
        style={{
          
        }}
      >
        
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#141414',
          }}
        >
          Content
        </div>
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
  )
}

export default Profile