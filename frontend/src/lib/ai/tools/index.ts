export interface Tool {
  name: string;
  description: string;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

export const toolRegistry: Record<string, Tool> = {
  filesystem: {
    name: "filesystem",
    description: "Read and write files",
    execute: async (_args) => {
      return "Success";
    },
  },
  sql: {
    name: "sql",
    description: "Execute SQL queries",
    execute: async (_args) => {
      return [];
    },
  },
};
