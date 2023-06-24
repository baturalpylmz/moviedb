import React from 'react'
import { Layout, Menu, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Navbar:React.FC = () => {
    const tabs = [{title:'anasayfa',id:0,link:'/'},{title:'favori filmler',id:1,link:'/favourite'},{title:'dene',id:2,link:'/asd'},{title:'deneme',id:3,link:'/asdasd'}]
      return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
        <       div className="demo-logo" />
            <Title style={{color:'white',userSelect:'none',marginRight:'50px'}}>MOVIE DB PROJECT</Title>
                <Menu
                theme="dark"
                mode="horizontal"
                items={tabs.map((a) => {
                    return {
                        key:a.id,
                        label: `${a.title}`,
                    };
                    })}
                />
            </Header>
        </Layout>
      );
}

export default Navbar