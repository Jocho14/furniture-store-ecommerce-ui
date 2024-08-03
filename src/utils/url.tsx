export const buildMultipleIdUrl = (
  backendUrl: string,
  route: string,
  ids: number[]
): string => {
  const idQuery = ids.join(",");
  return `${backendUrl}/${route}?id=${idQuery}`;
};
