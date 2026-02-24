import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@love_app_data";

export const saveAppData = async (data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving data", e);
  }
};

export const loadAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading data", e);
    return null;
  }
};
// utils/storage.ts
// export const loadAppData = async () => {
//   return null;
// };

// export const saveAppData = async (data: any) => {
//   return;
// };
