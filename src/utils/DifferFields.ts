import unorderedEqual from "./unorderedEqual";

export default function DifferFields(before: any[], after: any[]): boolean {
    if (before.length !== after.length) return true;

    for (let i = 0; i < before.length; i++) {
        const b = before[i];
        const a = after[i];

        if (a === null) continue;

        else if (a instanceof Array && b instanceof Array) {
            console.log(unorderedEqual(a,b));
            if (!unorderedEqual(a, b)) {
                return true;
            }
        }

        else if (a instanceof File) return true;

        else if (b !== a) return true;
    }

    return false;
}