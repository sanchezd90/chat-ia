# Prompt Examples

## Style directives

### Prompt

This is my react component styled with bulma:

```jsx
<section className="section"> 
    <h1 className="title">Chat con API de Cohere</h1>
    <form onSubmit={handleSubmit}>
      <div className="field"> 
        <div className="control">
          <input
            className="input"
            placeholder="Que queres saber?"
            type="text"
            required
            onChange={handleChange}
            value={input}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Enviar
          </button>
        </div>
      </div>
    </form>
    <p>{loading ? 'Esperando respuesta' : response}</p>
  </section>
```

I want that the title, the form and the paragraph are centered in the section and use only half of all the available width. I want the background to be dark and the text to be light. 

### Response
To achieve the desired styling for your React component using Bulma, you can wrap the content you want to center and style within a `container` div and apply Bulma classes accordingly. Here's the modified code:

```jsx
<section className="section has-background-dark">
  <div className="container has-text-light">
    <div className="columns is-centered">
      <div className="column is-half">
        <h1 className="title has-text-centered">Chat con API de Cohere</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="Que queres saber?"
                type="text"
                required
                onChange={handleChange}
                value={input}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </form>
        <p className="has-text-centered">
          {loading ? 'Esperando respuesta' : response}
        </p>
      </div>
    </div>
  </div>
</section>
```

Here's a breakdown of the changes made:

1. Added a `has-background-dark` class to the `section` element to give it a dark background.

2. Wrapped the content you want to center and style within a `container` div to limit the width.

3. Used `columns` and `column` classes to create a centered layout with a half-width column.

4. Added the `has-text-centered` class to center-align text within the `title` and `p` elements.

With these modifications, your title, form, and paragraph will be centered within the section and use only half of the available width, with a dark background and light text as requested.

## Generate readMe file 

### Prompt

I developed a js app that connects to Cohere chat and displays the answers. It has a backend, which receives the questions from the front, connects with Cohere to obtain the answer and serves the front with the response. It also stores the answers in a JSON file that works as database for the app. 


This is my frontend's App.jsx:
```javascript
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
          <h1 className="title has-text-light is-size-1">Cohere Chat</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field mt-5">
            <div className="control">
              <input
                className="input"
                placeholder="What do you want to know?"
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
                Send
              </button>
            </div>
          </div>
        </form>
        <p className={`custom-paragraph mt-5 ${response || loading ? '' : 'is-hidden'}`}> 
          {loading ? 'Waiting for response...' : response}
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

export default App
```


This is my backend's index.mjs:
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendRequest } from './controller/querie.mjs';

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/request', sendRequest)

app.get('/api',(req,res)=>{
    res.send({status:"Server is OK"})
})

app.listen(PORT, ()=>{
    console.log("Server is running on port: http:localhost:"+PORT);
});

This is my only controller:
import cohere from "cohere-ai";
import { readFile, writeFile } from "node:fs/promises";
import dotenv from 'dotenv';

dotenv.config()

const API_KEY = process.env.API_KEY

cohere.init(API_KEY);

const generateResponse = async (prompt) => {
    try{
        const response = await cohere.generate({
            model: "command",
            prompt,
            max_tokens: 300,
            temperature: 0.9,
            k: 0,
            stop_sequences: [],
            return_likelihoods: "NONE",
          });  
          const cohereMsg = response.body.generations[0].text;  
          return cohereMsg;
    }catch(error){
        throw new Error("Error al generar la respuesta: "+error.message)
    }
};

const addNewMessage = async(client,server) => {
    try{
        const bufferData = await readFile("./db/history.json");
        const objData = JSON.parse(bufferData)        
        const newMessage = { client, server}
        const newDataObj = [...objData, newMessage]
        await writeFile("./db/history.json",JSON.stringify(newDataObj))
    }catch(error){
        throw new Error("Error al guardar el mensaje: "+error.message)
    }
}

const sendRequest = async (req, res) => {
    const body = req.body;
    try{
        const prediction = await generateResponse(body.query);
        res.json(prediction)
        addNewMessage(body.query,prediction)        
    }catch(error){
        res.status(500).send(error.message)
    }
};

export { sendRequest };
```


This is an example of the data stored in the JSON file:
```json
[{"client":"Do you have access to current information?","server":" As an AI language model, I have access to a vast database of information. However, it is always possible that some of the information may be outdated or no longer relevant. It is important to verify any information you find with other sources to ensure that it is accurate and up-to-date. "}]
```

This is my backend's package.json:
```javascript

{
  "name": "chat-ia-back",
  "version": "1.0.0",
  "description": "custom chat IA",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.mjs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "chat",
    "ia",
    "backend"
  ],
  "author": "danielsanchez",
  "license": "ISC",
  "dependencies": {
    "cohere-ai": "^6.2.2",
    "cors": "2.8.5",
    "dotenv": "16.3.1",
    "express": "4.18.2"
  },
  "devDependencies": {
    "nodemon": "3.0.1"
  }
}
```

This is my frontend's package.json:
```javascript

{
  "name": "front",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.5.1",
    "bulma": "^0.9.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "vite": "^4.4.5"
  }
}
```


Give me a readMe file for this app

### Response

Sure, here is a sample README.md file for your application:

```markdown
# Cohere Chat Application

This is a chat application that connects to the Cohere chat service to obtain responses to user queries. It features a React frontend and an Express backend with a JSON file acting as the database. The application allows users to input questions and receive responses generated by the Cohere AI model.

## Features

- User-friendly interface for submitting queries
- Integration with the Cohere AI model for generating responses
- Backend API for handling user requests and storing conversation history
- JSON file acting as a simple database for storing chat history

## Prerequisites

- Node.js should be installed. You can download it from [here](https://nodejs.org/).
- Get a Cohere API key from [Cohere's website](https://www.cohere.ai/).

## Installation

### Frontend

1. Clone the repository.
2. Navigate to the `front` directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.

### Backend

1. Clone the repository.
2. Navigate to the root directory.
3. Create a `.env` file with your Cohere API key in the following format: `API_KEY=your_cohere_api_key_here`.
4. Run `npm install` to install the dependencies.
5. Run `npm start` to start the backend server.

## Usage

1. Open the application in your web browser.
2. Type your query in the input field and click "Send" to send the request.
3. Wait for the response to appear below the input field.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please feel free to contact the author at [your_email@example.com](mailto:your_email@example.com).


```