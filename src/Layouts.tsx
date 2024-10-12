import {ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useMemo} from "react";
import './Layouts.css';

const {Header, Content, Footer} = Layout;

const titleList = [
  { key: '1', title: 'Tanstack React Table' },
  { key: '2', title: 'MUI X Data Grid' },
  { key: '3', title: 'AG React' },
  { key: '4', title: 'React Data Grid' },
  { key: '5', title: 'Material React Table' }
];

const items = titleList.map((item, index) => {
  return {
    key: item.key,
    label: (
      <Link to={`/grid${index + 1}`} className="menu-item">
        <div className="menu-item-key">GRID {item.key}</div>
        <div className="menu-item-title">{item.title}</div>
      </Link>
    )
  };
});


function Layouts() {
  const location = useLocation();

  const selectedKey = useMemo(() => {
    const path = location.pathname;
    const match = path.match(/\/grid(\d+)/);
    return match ? match[1] : '1';
  }, [location.pathname]);


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
                selectedKeys={[selectedKey]}
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
