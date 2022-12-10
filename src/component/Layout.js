import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header></Header>
            <main style={{
                marginTop:"150px"
            }}>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default Layout