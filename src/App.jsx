import { useState } from 'react'
import { RestaurentDetail } from './components/RestaurentDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RestaurentDetail />
    </div>
  )
}

export default App
