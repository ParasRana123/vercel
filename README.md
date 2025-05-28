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

- **Frontend**: React, TypeScript 
- **Backend**: Node.js, Express  
- **Queue**: Redis  
- **Storage**: AWS S3  
- **Version Control**: GitHub Webhooks / API  
- **CI/CD Simulation**: Custom automation using `npm` lifecycle scripts 

## Project Structure

```bash
├── vercel-upload-service/     # Code for uploading files to S3 
│   ├── src/           
│   │     ├── aws.ts         
│   │     ├── file.ts     
│   │     ├── index.ts     
│   │     └── utils.ts   
├── vercel-deploy-service/    # Code for running the build command
│   ├── src/        
│   │     ├── aws.ts             
│   │     ├── index.ts            
│   │     └── utils.ts             
├── vercel-request-handler/   # Code for handling the requests
│   ├── src/        
│   │     ├── index.ts  
└── README.md
```

## Installation

> **Note**: Ensure Node.js (v16+) is installed on your machine.

1. **Clone the Repository**

```bash
git clone [repository-url]
cd vercel
```

2. **Install the Upload Service dependencies**

```bash
cd vercel-upload-service
npm install
```

3. **Install the Deploy Service dependencies**

```bash
cd vercel-deploy-service
npm install
```

4. **Install the Request Handler dependencies**

```bash
cd request-handler-service
npm install
```

5. **Install the Frontend dependencies**

```bash
cd frontend
npm install
```

6. **Create a `.env` file in all the three folders `vercel-upload-service`, `vercel-deploy-service` and `vercel-request-handler`**

    Navigate to these folders and create a `.env` using:
    ``` bash
    cd vercel-upload-service
    echo. > .env
    ```

``` bash
cd vercel-deploy-service
echo. > .env
```

``` bash
cd vercel-request-handler
echo. > .env
```

7. **Start the vercel-upload-service server**

```bash
cd vercel-upload-service
npm run dev
```

8. **Start the vercel-deploy-service server**

```bash
cd vercel-dpeloy-service
npm run dev
```

9. **Start the vercel-request-handler server**

```bash
cd request-handler-service
npm run dev
```

10. **Start the frontend application**

```bash
cd frontend
npm run dev
```

## Contributing

We welcome contributions from the community! Whether you're interested in improving features, fixing bugs, or adding new functionality, your input is valuable. Feel free to reach out to us with your ideas and suggestions.

## License
This project is licensed under the MIT License - see the LICENSE file for details.