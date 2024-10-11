import {ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet} from "react-router-dom";

const {Header, Content, Footer} = Layout;

const items = ['1','2','4', '5'].map((item, index) => {
  return {
    key: index + 1,
    label: <Link to={`/grid${item}`}><span>Grid {item}</span></Link>,
  }
});

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
                defaultSelectedKeys={['1']}
                items={items}
                style={{flex: 1, minWidth: 0}}
              />
            </ConfigProvider>
          </Header>
          <Content style={{padding: '32px'}}>
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
