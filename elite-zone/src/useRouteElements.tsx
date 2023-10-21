import { useRoutes } from 'react-router-dom'
import RegisterLayout from './pages/Register/index'
export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path:'/register',
            element: <RegisterLayout />
        }
    ])
    return routeElements
}