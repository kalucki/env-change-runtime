# Why?

This library was created to solve a specific problem of having to **read environment variables from a file in the js application runtime (browser)**.

# How?

It works by simply reading the contents of an .env file, parsing it and then exposing them to be available in the context of the application. There is a simple cache to avoid fetching the file multiple times.

In order to achieve the wanted effect, remember that you need to serve the .env file from your http server.

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

**Examples:**

- **Initialization:**
  Put this somewhere at the starting point of your application, to make sure the app starts only after we load variables. In most cases it will be your App, main or index .ts/js/tsx

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
// Output might be: { MY_TEST_TOKEN: '2137'}
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
await init({ pathToEnv: "/.env" });
```

## When using Docker

If you are using docker, you can pipe your environment variables into the file like so:

```bash
env > /your/app/root/.env
```

Beware that this will pipe all your environment variables from that container, so make sure that no secrets are being exposed.

## What to Look Out For

- **File Accessibility:** Make sure the .env file is accessible at the provided path (e.g., `/.env`). When testing in a browser, your HTTP server must serve this file correctly.

- **Cache Behavior:** The library caches the environment variables after the first load to avoid unnecessary fetches.

# But again...why?

When building an application, there are times where you need one set of environment variables during the build step, and a different set during runtime. I encountered this challenge in one of my projects and came up with a solution that worked well in that context.

There are certainly other ways to solve this problem—some may even be more robust or suited to specific environments(modifying the bundle post build with a bash script comes to mind)—but this approach has worked reliably for my needs. Hoping that someone finds this helpful.
