
import { Outlet } from 'react-router-dom'
import Card from './Card'
import SideNav from './SideNav'

function Layout() {
    return (
        <div className='flex max-h-fit min-h-full bg-blue-100 text-green-400'>
            <div className='min-w-[10%] bg-green-200 hidden md:block'>
                <SideNav/>
            </div>
            <div className='flex flex-col min-w-[90%] '>
                {/* <Nav /> */}
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