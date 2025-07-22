export default function DifferFields(field1: string[], field2: string[]): boolean {
    for(let i = 0; i < field1.length; i++) if (field1[i] !== field2[i]) return false;

    return true;
}