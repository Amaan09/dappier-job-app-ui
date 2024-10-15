# Dappier Job Application UI

Welcome to the Dappier Job Application UI repository. This is a user interface for an integrated application that allows users to upload resumes and job descriptions. The application utilizes a RAG (Retrieval-Augmented Generation) model to provide feedback or generate questions based on the uploaded documents. The main purpose of this UI is to make the user interaction with the backend API and RAG model seamless and user-friendly.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Overview

This project is a part of a larger application structure:

- **UI**: The current repository, responsible for the front-end experience.
- **Backend API**: Built using NestJS, it handles the business logic and API requests. You can find it [here](https://github.com/Amaan09/dappier-job-app-api).
- **RAG Model**: A Flask-based service that processes the resumes and job descriptions to generate feedback or questions. You can find it [here](https://github.com/Amaan09/dappier-job-app-bot).

## Features

- **File Upload**: Easily upload resumes and job descriptions.
- **Feedback Generation**: Get instant feedback on how well you have answered to a resume or job description based question.
- **Question Generation**: Receive AI-generated questions for interview preparation.
- **User-Friendly Interface**: An intuitive and easy-to-use interface for an efficient user experience.

## Project Structure
```
src
├── api
│   ├── auth-api.ts
│   ├── file-upload-api.ts
│   ├── lib
│   │   └── api-client.ts
│   ├── resume-api.ts
│   └── user-api.ts
├── assets
│   └── react.svg
├── domain
│   ├── constants
│   │   ├── index.ts
│   │   ├── prompt-type.ts
│   │   ├── search-query-type.ts
│   │   └── session-storage-type.ts
│   ├── entities
│   │   ├── chat-history.ts
│   │   ├── index.ts
│   │   ├── resume.ts
│   │   └── user.ts
│   ├── index.ts
│   ├── props
│   │   ├── app-children-props.ts
│   │   ├── chat-bubble-props.ts
│   │   ├── chat-form.ts
│   │   ├── chat-props.ts
│   │   ├── chatbot-dropdown-props.ts
│   │   ├── index.ts
│   │   ├── layout-props.ts
│   │   └── loader-props.ts
│   ├── requests
│   │   ├── chat-completion-request.ts
│   │   ├── chat-history-request.ts
│   │   ├── create-resume-request.ts
│   │   ├── index.ts
│   │   ├── login-request.ts
│   │   └── signup-request.ts
│   ├── response
│   │   ├── chat-completion-response.ts
│   │   ├── file-upload-response.ts
│   │   ├── index.ts
│   │   └── user-access-token-response.ts
│   └── utils
│       ├── class-names.ts
│       └── index.ts
├── hooks
│   ├── use-session-storage.tsx
│   └── use-toast.tsx
├── index.css
├── main.tsx
├── pages
│   ├── auth
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── dashboard
│   │   └── dashboard.tsx
│   ├── home
│   │   ├── components
│   │   │   └── user-welcome.tsx
│   │   └── home.tsx
│   ├── resume-chatbot
│   │   ├── components
│   │   │   ├── chat-bot-dropdown.tsx
│   │   │   ├── chat-bubble.tsx
│   │   │   └── chat.tsx
│   │   └── resume-chatbot.tsx
│   └── resume-upload
│       └── resume-upload.tsx
├── routes
│   ├── helpers
│   │   ├── auth-route.tsx
│   │   └── protected-route.tsx
│   ├── index.tsx
│   ├── provider.tsx
│   ├── root.tsx
│   └── router.tsx
├── shared
│   ├── layout.tsx
│   └── loader.tsx
└── vite-env.d.ts

```

## Getting Started

These instructions will help you set up and run the project locally on your machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Amaan09/dappier-job-app-ui.git
   cd dappier-job-app-ui
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project. You can define your environment variables here. For local development, you might include:

   ```env
   # API Base URL Configuration
   VITE_BASE_URL=http://localhost:8080/
   ```

### Usage

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to interact with the application.

Ensure the backend API and RAG Model services are running. Follow their respective instructions in each repository:

- [Backend API](https://github.com/Amaan09/dappier-job-app-api)
- [RAG Model](https://github.com/Amaan09/dappier-job-app-bot)
