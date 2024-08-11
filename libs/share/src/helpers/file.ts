import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const unzipFile = async (filePath: string, outputDir: string) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const unzipCommand = `unzip ${filePath} -d ${outputDir}`;
  try {
    const { stdout, stderr } = await execPromise(unzipCommand);
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  } catch (error) {
    throw error;
  }
};
