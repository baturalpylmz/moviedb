import { Layout } from 'antd'
import React from 'react'

const Footer:React.FC = () => {

    const { Footer } = Layout
 
    return (
        <div>
            <Layout>
                <Footer style={{ textAlign: 'center', backgroundColor:'black', color:'white' }}>
                    MovieDB App Project ©2023 Created by BY
                </Footer>
            </Layout>
        </div>
    )
}

export default Footer