export default function DifferFields(fields1: string[], fields2: string[]): boolean {
    console.log(fields1, fields2);
    for(let i = 0; i < fields1.length; i++) if (fields1[i] !== fields2[i]) return true;

    return false;
}