import { z } from 'zod';

export const ROLES = z.enum(['owner', 'delivery']);
