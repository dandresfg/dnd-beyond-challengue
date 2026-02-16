import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export const SLUG_REGEX = /^[a-z0-9-]+$/;

@Injectable()
export class SlugValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('Slug is required');
    }

    // Validate slug format: lowercase, alphanumeric, hyphens only
    if (!SLUG_REGEX.test(value)) {
      throw new BadRequestException(
        'Invalid slug format. Must contain only lowercase letters, numbers, and hyphens.',
      );
    }

    return value;
  }
}
