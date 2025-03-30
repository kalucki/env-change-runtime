interface EnvVariables {
  [key: string]: string;
}

let cachedEnvVariables: EnvVariables | null = null;

const extractEnvsFromText = (text: string): EnvVariables => {
  const envVars: EnvVariables = {};
  const regex = /^\s*(?!#)([^=]+?)\s*=\s*(.*)$/gm;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const key = match[1].trim();
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    envVars[key] = value;
  }
  return envVars;
};

export const loadEnvVariables = async (
  pathToEnv: string = "/.env"
): Promise<void> => {
  if (cachedEnvVariables) {
    return;
  }

  try {
    const response = await fetch(pathToEnv);
    const text = await response.text();
    cachedEnvVariables = extractEnvsFromText(text);
  } catch (err) {
    throw new Error(
      "Failed to load env variables. Check that the .env file exists at the specified path and is syntactically correct."
    );
  }
};

export const getEnvVariables = async (): Promise<EnvVariables> => {
  if (cachedEnvVariables) {
    return cachedEnvVariables;
  }
  await loadEnvVariables();
  return cachedEnvVariables || {};
};

export const init = async ({
  pathToEnv = "/.env",
}: {
  pathToEnv?: string;
} = {}): Promise<void> => {
  await loadEnvVariables(pathToEnv);
};

export const clearCache = (): void => {
  cachedEnvVariables = null;
};
