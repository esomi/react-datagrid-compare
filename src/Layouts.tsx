import './App.css'
import {Breadcrumb, ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet} from "react-router-dom";

const {Header, Content, Footer} = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: <Link to={`/nav${index + 1}`}>nav {index + 1}</Link>,
}));

const breadcrumbItems = [{title: 'Home'}, {title: 'List'}, {title: 'Layouts'}];

function Layouts() {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: 'rgb(61 61 61)',
              controlHeight: 32,
            },
          },
        }}
      >
        <Layout>
          <Header>
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    darkItemBg: 'rgb(61 61 61)',
                    darkItemSelectedBg: 'rgb(110 150 214)',
                    padding: 100,
                  },
                },
              }}
            >
              <Menu
                mode="horizontal"
                theme="dark"
                defaultSelectedKeys={['2']}
                items={items}
                style={{flex: 1, minWidth: 0}}
              />
            </ConfigProvider>
          </Header>
          <Content style={{padding: '0 48px'}}>
            <Breadcrumb style={{margin: '16px 0'}} items={breadcrumbItems}/>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 560,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet/>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            ©{new Date().getFullYear()} Created by
          </Footer>
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default Layouts
