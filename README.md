# Why?

This library was created to solve a specific problem of having to **read environment variables from a file in the js application runtime (browser)**.

# How?

It works by simply reading the contents of an .env file, parsing it and then exposing them to be available in the context of the application. There is a simple cache to avoid fetching the file multiple times.

# Usage

## Installation

Install the package via pnpm:

```bash
pnpm install env-change-runtime
```

or yarn

```bash
yarn add env-change-runtime
```

## Importing the Library

Import the methods you need. For example:

```js
// Using named exports
import { init, getEnvVariables } from "env-change-runtime";
```

## Initialization

Before you can access environment variables, you must initialize the library. This is done with the `init` method.

### `init` Method

**Signature:**

```ts
init({
  pathToEnv?: string,    // URL or relative path to your .env file. Defaults to '/.env'
}): Promise<void>
```

**Examples:**

- **Initialization:**
  Put this somewhere in the starting point of your application, to make sure the app starts only after we load variables. In most cases it will be your App, main or index .ts/js/tsx

```js
await init({ pathToEnv: "/.env" });
```

## Retrieving Environment Variables

After initialization, use the `getEnvVariables` method to retrieve the parsed environment variables.

### `getEnvVariables` Method

**Signature:**

```ts
getEnvVariables(): { [key: string]: string }
```

**Example:**

```js
const envVars = await getEnvVariables();
console.log(envVars);
// Output might be: { TEST_ENV: 'hello_kitty'}
```

## Cache Management

To allow reloading the environment variables (for example, if the .env file changes during runtime), you can clear the cached values using the `clearCache` method. You probably won't need this 99% of the time.

### `clearCache` Method

**Signature:**

```ts
clearCache(): void
```

**Example:**

```js
clearCache();
await init({ pathToEnv: "/.env", isDev: false });
```

## What to Look Out For

- **File Accessibility:** Make sure the .env file is accessible at the provided path (e.g., `/.env`). When testing in a browser, your HTTP server must serve this file correctly.

- **Cache Behavior:** The library caches the environment variables after the first load to avoid unnecessary fetches.

# But again...why?

Sometimes you want to build the application with a specific set of environment variables but then use different environmen variables in the runtime.
I was faced with a problem like that and this was the best solution that came to my mind. I stumbled upon the same problem on a different project, so I decided to create a small library, just in case it helps someone.
There are other ways of achieving the same goal, but I found that this works well for me.
