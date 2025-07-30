import unorderedEqual from "./unorderedEqual";

export default function DifferFields(before: any[], after: any[]): boolean {
    if (before.length !== after.length) return true;

    for (let i = 0; i < before.length; i++) {
        const b = before[i];
        const a = after[i];

        if (a instanceof Array && b instanceof Array) if (!unorderedEqual(a, b)) return true;

        if (a === null) continue;
        if (a instanceof File) return true;

        if (b !== a) return true;
    }

    return false;
}