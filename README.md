# Pokedex - Next.js Project

A simple Pokédex application built with Next.js, allowing users to explore Pokémon information.
Built as part of a Programming-education focused in Frontend-techniques studied in 2025.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)




## Project Overview

This project is a Pokédex web application developed using Next.js. It provides users with an interface to view and search for various Pokémon, displaying their details and characteristics. The application leverages Next.js features like server-side rendering, static site generation, and API routes to deliver a fast and efficient user experience.

![Homepage](/page.png)

## Features

- **Browse Pokémon**: View a list of Pokémon.
- **Search Pokémon**: Search for specific Pokémon by name.
- **View Pokémon Details**: See detailed information for each Pokémon, including type, and sprites.
- **Responsive Design**: The application is designed to work on various devices.
- **Error Handling:** Implements `not-found.tsx` to gracefully handle 404 errors.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building performant web applications.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- [Lucide React](https://lucide.dev/) - Icon library.
- [@radix-ui](https://www.radix-ui.com/) - Set of unstyled, accessible components.
- [PokeAPI](https://pokeapi.co/) - Pokémon API used to fetch data.
- [Vercel](https://vercel.com/) - Platform for deployment and hosting.

## Installation

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kippeves/pokedex
    cd pokedex
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install or pnpm install or bun install
    ```

3.  **Set up environment variables:**

    *   This project does not require environment variables

4.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev or bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Usage

*   **Browsing Pokémon:** Navigate to the home page to see a list of featured Pokémon.
*   **Searching Pokémon:** Use the search bar at the top to find a specific Pokémon by name. The search will redirect you to `/search/[pokemon-name]`.
*   **Exploring the Pokedex:** Use the sidebar to filter for different types of pokemon

## Directory Structure

```
.
├── app/
│   ├── layout.tsx           # Root layout component
│   ├── not-found.tsx        # Custom 404 page
│   └── page.tsx             # Home page
├── components/
│   ├── page/
│   │   └── navbar.tsx       # Navigation bar component
│   ├── pokedex/
│   │   └── app-sidebar.tsx  # Sidebar for Pokedex
│   ├── pokemon/
│   │   ├── card/            # Card components
│   │   ├── main/            # Main components
│   │   └── ui/              # UI components
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   └── page/
│       └── footer.tsx       # Footer component
├── lib/
│   └── enums.tsx            # Enums used in project
├── next.config.js           # Next.js configuration file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration file
├── README.md                # This file
└── tsconfig.json            # TypeScript configuration file
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch with a descriptive name.
3.  Make your changes and commit them.
4.  Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).