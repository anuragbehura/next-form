import { nanoid } from "nanoid";

export function createSlug(name: string): string {
    return `${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}-${nanoid(6)}`;
}
