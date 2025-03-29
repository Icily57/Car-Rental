
import { Outlet } from 'react-router-dom'
import Card from './Card'
// import SideNav from './SideNav'
import Nav from './Nav'

function Layout() {
    return (
        <div className='max-w max-h-fit min-h-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'>
            
                <Nav />
                    <Card>
                        <Outlet />
                    </Card>
            
        </div>
    )
}

export default Layout