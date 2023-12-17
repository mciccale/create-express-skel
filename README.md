# create-express-skel

`create-express-skel` is a command-line tool to quickly bootstrap a new Express.js application. It allows you to choose between a JavaScript or TypeScript setup and takes care of the initial boilerplate, including dependency installation and a basic project structure.

## Installation

This CLI tool is intended to be used with `npx`, so there's no need for a global installation. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Usage

To create a new Express.js application, run:

```bash
npx create-express-skel
```

## Options

- `<project-name>`: Specify the name of the project directly.

- `--ts`: Use this option if you want to create a TypeScript-based Express.js application.

- `--eslint`: Use this option if you want to install and configure ESlint in your Express.js application.

- `--no-eslint`: Use this option if you do not want to install and configure ESlint in your Express.js application.

- `--git`: Use this option if you want to initialize a Git repository.

- `--no-git`: Use this option if you do not want to initialize a Git repository.

If you do not provide a project name or options via the command line, `create-express-skel` will prompt you interactively to input these details.

## Interactive Mode

When running `create-express-skel` without any arguments, it enters an interactive mode, asking you for:

**Project Name**: The name of your new Express.js application.
**Template Type**: Whether you want your project in JavaScript or TypeScript.
**Configure ESlint**: Quickly install and configure ESlint.
**Initialize Git Repository**: Initialize the Git repository and initial commit.

## Example

Creating a new JavaScript Express.js application named 'my-app' and configure the project interactively:

```bash
npx create-express-skel my-app
```

Creating a new TypeScript Express.js application named 'my-app' and configure the project without interaction providing the necessary options:

```bash
npx create-express-skel my-app --ts --eslint --no-git
```

_Note_: If **ESlint** selected, its configuration runs intereactively

## Features

- Fast setup for new Express.js projects.
- Option to choose between JavaScript and TypeScript.
- Interactive mode for ease of use.
- Deals with all the boilerplate.
- Initializes a git repository with an initial commit.

## Contributing

Your contributions are always welcome! Please feel free to submit any issues or pull requests.

## License

Distributed under the MIT License. See `LICENSE` for more information.
