import { SetMetadata } from '@nestjs/common';

export const IDENTITY_KEY = 'identity';
export const Identity = (options: {id: string, query?: string, path?: string}) => SetMetadata(IDENTITY_KEY, options);