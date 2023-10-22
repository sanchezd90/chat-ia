# Cohere Chat Application

This is a simple chat application that connects to Cohere Chat. This app was developed using AI tools, primarily as a learning exercise to explore the integration of AI capabilities in the app development process. 

## Description
The application serves as a basic interface to interact with Cohere's API, providing responses based on the queries input by the user. The chat responses are stored in a JSON file that works as the app's database.

## Role of AI tools
With the help of AI tools, particularly ChatGPT and Cohere, I quickly built an app using Bulma for frontend styling, even though I had never used it before. ChatGPT generated the necessary components and added the right Bulma classes. The frontend development process took under 30 minutes. 

I also used chatGPT as aid in the creation of this readMe.dm. It took me about an hour to complete this. 

You can find prompt examples [here](./promptExamples.md)

## Prerequisites
- Node.js should be installed. You can download it from [here](https://nodejs.org/).
- Get a Cohere API key from [Cohere's website](https://www.cohere.ai/).

## Getting Started
To get the application up and running on your local machine, follow the steps below:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/sanchezd90/chat-ia
```

2. Install the necessary dependencies for both the frontend and backend.
```bash
cd frontend
npm install
cd ../backend
npm install
```

## Setting up the Environment Variables

Create a .env file in the backend directory and add the following:

```makefile
API_KEY=your_cohere_api_key
PORT=3000
```

Replace your_cohere_api_key with your actual Cohere API key.

## Running the Application

1. Start the backend server by running in the root directory:
```js
cd backend
npm start
```

2. Start the frontend server by running in the root directory:
```js
cd frontend
npm start
```

3. Open your web browser and navigate to http://localhost:3000 to access the application.

## Data Structure Description

The JSON data stored in the database comprises entries that follow a specific structure. Each entry is represented as an object with the following key-value pairs:

- **client**: A string field containing the content of the message posted by the user.
- **server**: A string field containing the content of the response by Cohere.

**Example Entry:**
```json
[{"client":"Do you have access to current information?","server":" As an AI language model, I have access to a vast database of information. However, it is always possible that some of the information may be outdated or no longer relevant. It is important to verify any information you find with other sources to ensure that it is accurate and up-to-date. "}]
```