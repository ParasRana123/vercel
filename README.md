# Custom Deployment Platform

A full-stack, serverless web deployment platform that mirrors Vercel’s workflow—allowing users to deploy frontend applications directly from GitHub repositories with a seamless CI/CD experience.

## Features

- **GitHub Integration** – Deploy apps directly by pasting the repository URL
- **AWS S3 Storage** – Extracts, stores, and serves production-ready static files from S3
- **Automated Build Pipeline** – Simulates CI/CD by running `npm install`, `npm run build`, and `npm run dev`
- **Redis Queue Integration** – Asynchronous task handling with queue-based architecture for scalability and efficiency
- **Fault-Tolerant Execution** – Build processes decoupled from request-handling to ensure stability during high traffic
- **Instant Deployment URLs** – Generates unique links for previewing and sharing deployed projects

## Tech Stack

- **Frontend**: React / HTML / CSS / JavaScript  
- **Backend**: Node.js, Express  
- **Queue**: Redis  
- **Storage**: AWS S3  
- **Version Control**: GitHub Webhooks / API  
- **CI/CD Simulation**: Custom automation using `npm` lifecycle scripts 

## Project Structure

```bash
├── backend/
│   ├── src/              
│        ├── defaults/     # Default prompts for node and react
│            ├── react.ts
│            └── node.ts
│   ├── index.ts           # All main routes in this file
│   ├── prompts.ts         # format in which the response returned
│   ├── constants.ts       # Utility file
│   └── stripindents.ts    # Utility file
├── frontend/
│   ├── components/        # Contains various components
│   ├── hooks/             # Web Container config file
│   ├── pages/             # Contains landing page
│   └── types/             # Defined the types of file structure
└── README.md
```

## Installation

> **Note**: Ensure Node.js (v16+) is installed on your machine.

1. **Clone the Repository**

```bash
git clone [repository-url]
cd boult.new
```

2. **Install the Backend dependencies**

```bash
cd be
npm install
```

3. **Install the Frontend dependencies**

```bash
cd frontend
npm install
```

4. **Set up environment varaibles**

> **Note**: Create the .env file in the be folder.

```bash
echo. > .env
```

5. **Start the backend server**

```bash
cd be
npm run dev
```

6. **Start the frontend application**

```bash
cd frontend
npm run dev
```

## Contributing

We welcome contributions from the community! Whether you're interested in improving features, fixing bugs, or adding new functionality, your input is valuable. Feel free to reach out to us with your ideas and suggestions.

## License
This project is licensed under the MIT License - see the LICENSE file for details.