export const objectToFormData = (
  data: any,
  formData: FormData = new FormData(),
  parentKey: string | null = null
): FormData => {
  if (data === null || data === undefined) return formData;

  if (typeof data === "object" && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        if (value.every((item) => item instanceof File)) {
          value.forEach((file) => {
            formData.append(newKey, file);
          });
        } else {
          value.forEach((item, index) => {
            objectToFormData(item, formData, `${newKey}[${index}]`);
          });
        }
      } else {
        objectToFormData(value, formData, newKey);
      }
    });
  } else {
    if (parentKey) {
      formData.append(parentKey, data);
    }
  }

  return formData;
};
