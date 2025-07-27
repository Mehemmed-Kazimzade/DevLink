export default function DifferFields(before: any[], after: any[]): boolean {
    console.log(before, after);
    if (before.length !== after.length) return true;

    for (let i = 0; i < before.length; i++) {
        const b = before[i];
        const a = after[i];

        if (a === null) continue;
        if (a instanceof File) return true;

        if (b !== a) return true;
    }

    return false;
}