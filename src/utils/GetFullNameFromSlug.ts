export default function GetFullNameFromSlug(userSlug: string) {
    const [firstName, lastName] = userSlug.split("-").slice(1);

    return firstName + " " + lastName;
}