import {useState} from 'react'
import axios from 'axios'
import './App.css'
import 'bulma/css/bulma.min.css'

const App = () => {  

  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    setLoading(true)            
    const response = await axios.post('http://localhost:3002/api/request',{
      query:input
    })
    setResponse(response.data);    
    setLoading(false)
  }

  return (
    <section className="section has-background-dark is-fullheight">
  <div className="container">
    <div className="columns is-centered is-vcentered" style={{ minHeight: '100vh' }}>
      <div className="column is-half">
        <div className="has-text-centered">
          <h1 className="title has-text-light is-size-1">Chat con API de Cohere</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field mt-5">
            <div className="control">
              <input
                className="input"
                placeholder="¿Qué queres saber?"
                type="text"
                required
                onChange={handleChange}
                value={input}
              />
            </div>
          </div>
          <div className="field mt-5">
            <div className="control has-text-centered">
              <button className="button is-primary" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </form>
        <p className={`custom-paragraph mt-5 ${response || loading ? '' : 'is-hidden'}`}> 
          {loading ? 'Esperando respuesta...' : response}
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

export default App
