export const generateSku = () => {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SKU-${Date.now()}-${rand}`;
};
