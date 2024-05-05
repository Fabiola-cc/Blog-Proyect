import './App.css'
import { TokenProvider } from './Hooks/useToken'
import { NavigationProvider } from './Hooks/useNavigate'
import Pages from './Pages'


function App() {
  return (
    <TokenProvider>
      <NavigationProvider>
        <Pages />
      </NavigationProvider>
    </TokenProvider>
  )
}

export default App