
import { Outlet } from 'react-router-dom'
import Card from './Card'
import AdminSideNav from './AdminSideNav'

function AdminLayout() {
    return (
        <div className='flex max-h-fit min-h-full bg-blue-200 text-green-400'>
            <div className='min-w-[10%] bg-green-200 hidden md:block'>
                <AdminSideNav/>
            </div>
            <div className='flex flex-col min-w-[90%] '>
            
                <div className="h-fit">
                    <Card>
                        <Outlet />
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default AdminLayout