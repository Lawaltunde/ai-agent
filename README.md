# AI Agent

This project is a simple AI agent that uses the Google Gemini model to generate text based on a prompt. It's built with TypeScript and runs on the Bun runtime.

## ✨ Features

*   Generates text using the latest Gemini AI model.
*   Uses the Vercel AI SDK for seamless integration.
*   Fast and efficient, thanks to Bun.

## 🚀 Getting Started

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A Google AI API key.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Lawaltunde/ai-agent.git
    cd ai-agent
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up your environment variables:**

    Create a `.env` file in the root of the project and add your Google AI API key:

    ```
    GOOGLE_API_KEY="YOUR_API_KEY"
    ```

### Usage

To run the agent, execute the following command:

```bash
bun run index.ts
```

The agent will then generate and print a short story about a cat in space.

## 🛠️ Built With

*   [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
*   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.
*   [Vercel AI SDK](https://sdk.vercel.ai/) - An open-source library for building AI-powered user interfaces.
*   [Google Gemini](https://deepmind.google/technologies/gemini/) - A family of multimodal AI models.