import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  registerDecorator,
  ValidateNested,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortItemDto {
  @ApiProperty({ enum: StatusEnum, description: 'Status of the item' })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty({ enum: SortEnum, description: 'Sort order' })
  @IsEnum(SortEnum)
  sort: SortEnum;
}

export class PaginateDto {
  @ApiProperty({
    type: [SortItemDto],
    description: 'Array of sorting items',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortItemDto)
  sortItems?: SortItemDto[];
}

@ValidatorConstraint({ async: false })
export class EqualLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: any) {
    const [array1Key, array2Key] = args.constraints;
    const object = args.object as any;
    const array1 = object[array1Key];
    const array2 = object[array2Key];

    // Check if both arrays are defined and have the same length
    return (
      Array.isArray(array1) &&
      Array.isArray(array2) &&
      array1.length === array2.length
    );
  }

  defaultMessage(args: any) {
    return 'The length of the arrays must be equal';
  }
}

export function EqualLength(
  array1Key: string,
  array2Key: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [array1Key, array2Key],
      validator: EqualLengthConstraint,
    });
  };
}

export class Paginate2Dto {
  @ApiProperty({ type: [String], description: 'Status of the item' })
  @IsArray()
  sort: string[];

  @ApiProperty({ type: [String], description: 'Sort order' })
  @IsArray()
  sortBy: string[];

  // Apply the custom validator at the class level
  @EqualLength('sort', 'sortBy', {
    message: 'The length of sort and sortBy arrays must be equal',
  })
  validateArraysLength: boolean;
}
