import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

export default function Home() {
    return (
        <main className=''>
            <Sidebar />
            <div className=''>
                <Header />
                <div className=''>
                    HI HOME!
                </div>
                <Footer />
            </div>
        </main>
    )
}
