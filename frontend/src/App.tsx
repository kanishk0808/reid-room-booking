import './App.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'



function App() {

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex grow'>

        {/* sidebar */}
        <Sidebar />

        {/* main content */}
        <div className='flex grow bg-cream'>Bookings</div>
      </div>
    </div>
  )
}

export default App
