import React from 'react'
import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
import Link from 'next/link';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


const { Header, Content, Footer } = Layout;

const Navbar = () => {
  return (
	<div>
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
        
        <Menu theme="dark" mode="horizontal"  >
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
            <Link href="/profile">Profile</Link>
          </Menu.Item>
        </Menu>

      </Header>
	</div>
  )
}

export default Navbar