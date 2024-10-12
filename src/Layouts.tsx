import {ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet} from "react-router-dom";

const {Header, Content, Footer} = Layout;

const titleList = [
  { title: 'Grid 1', subtitle: 'Tanstack React Table' },
  { title: 'Grid 2', subtitle: 'MUI X Data Grid' },
  { title: 'Grid 3', subtitle: 'AG Grid React' },
  { title: 'Grid 4', subtitle: 'React Data Grid' },
  { title: 'Grid 5', subtitle: 'Material React Table' }
];

const items = titleList.map((item, index) => {
  return {
    key: index + 1,
    label: (
      <Link to={`/grid${index + 1}`}>
        <small>{item.title}</small>
        <span style={{margin: '0 4px'}}> | </span>
        <b>{item.subtitle}</b>
      </Link>
    )
  };
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
                    padding: 80,
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
