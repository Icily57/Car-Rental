
import { Outlet } from 'react-router-dom'
import Card from './Card'
// import SideNav from './SideNav'
import Nav from './Nav'

function Layout() {
    return (
        <div className='flex max-h-fit min-h-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'>
            <div className='min-w-[10%] bg-gradient-to-b from-black via-gray-900 to-black hidden md:block'>
                {/* <SideNav/> */}
            </div>
            <div className='flex flex-col min-w-[90%] '>
                <Nav />
                <div className="h-fit">
                    <Card>
                        <Outlet />
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default Layout