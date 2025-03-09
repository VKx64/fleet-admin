import PocketBase from 'pocketbase';

let pb = null;

// Initialize PocketBase on client side only
if (typeof window !== 'undefined') {
  try {
    pb = new PocketBase("http://192.168.1.7:8090");
  } catch (error) {
    console.error('Failed to initialize PocketBase:', error);
  }
}

export { pb };

// Helper to get the current auth store state
export const getCurrentUser = () => {
  return pb?.authStore?.model || null;
};

// Export auth store to access isValid, token etc.
export const authStore = pb?.authStore || null;