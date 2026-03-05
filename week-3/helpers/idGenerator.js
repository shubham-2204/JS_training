export const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomSegment = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomSegment}`;
};