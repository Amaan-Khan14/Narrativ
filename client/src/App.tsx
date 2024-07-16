import { Quote } from './pages/Quote'
import { Signup } from './pages/Signup'

function App() {
  return (
    <div className='grid grid-cols-2 bg-gradient-to-br from-slate-300 to-slate-500'>
      <div>
        <Signup/>
      </div>
      <Quote />
    </div>


  )
}

export default App
