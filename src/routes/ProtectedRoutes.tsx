import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useSelector((store: RootState) => store.auth)
	return isAuthenticated ? <>{children}</> : <Navigate to='/login' />
}

export default ProtectedRoutes
