export const Scheme = ['light', 'dark', 'system'] as const;
export type Scheme = (typeof Scheme)[number]
