import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function AdminRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const {user} = useSelector((state)=>state.auth)
  if (token !== null && user.role==='Admin') {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default AdminRoute