import { BadRequestException } from '@nestjs/common';
import { SlugValidationPipe } from './slug-validation.pipe';

describe('SlugValidationPipe', () => {
  const pipe = new SlugValidationPipe();

  it('should return value when slug is valid (lowercase, numbers, hyphens)', () => {
    expect(pipe.transform('briv')).toBe('briv');
    expect(pipe.transform('gandalf-the-grey')).toBe('gandalf-the-grey');
    expect(pipe.transform('hero-123')).toBe('hero-123');
  });

  it('should throw when value is empty string', () => {
    expect(() => pipe.transform('')).toThrow(BadRequestException);
    expect(() => pipe.transform('')).toThrow('Slug is required');
  });

  it('should throw when value is invalid format (uppercase)', () => {
    expect(() => pipe.transform('Briv')).toThrow(BadRequestException);
    expect(() => pipe.transform('Briv')).toThrow(
      'Invalid slug format. Must contain only lowercase letters, numbers, and hyphens.',
    );
  });

  it('should throw when value contains spaces or special characters', () => {
    expect(() => pipe.transform('briv the brave')).toThrow(BadRequestException);
    expect(() => pipe.transform('briv_hero')).toThrow(BadRequestException);
    expect(() => pipe.transform('briv.hero')).toThrow(BadRequestException);
  });
});
