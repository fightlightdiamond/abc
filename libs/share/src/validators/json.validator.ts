import * as fs from 'node:fs';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const readAndValidateJsonFile = async (filePath: string, T) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    const questionDto = plainToInstance(T, jsonData);
    const errors = await validate(questionDto);

    // if (errors.length > 0) {
    //   throw new BadRequestException(errors);
    // }
    return errors;
  } catch (err) {
    throw new BadRequestException(err);
  }
};
