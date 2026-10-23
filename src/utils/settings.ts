import { storage } from '#imports';

export const collapseByDefault = storage.defineItem<boolean>(
    'local:collapseByDefault',
    {fallback: true}
);