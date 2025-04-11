export const logger = {
  info: (message: string) => {
    process.stdout.write(`${message}\n`);
  },
};
