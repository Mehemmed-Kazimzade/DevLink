export default function ConvertToFormData(obj: Record<string, any>) {
    const formData = new FormData();

    for(const key in obj) {
        const value = obj[key];
        if (value !== null) formData.append(key, value);
    }

    return formData;
}