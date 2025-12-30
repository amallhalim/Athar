import { Route, Routes } from 'react-router'
import App from './App'

const RoutesApps = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* Add more Routes here */}
    </Routes>
  )
}

export default RoutesApps

