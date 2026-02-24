import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, ButtonText } from "@/components/ui/button";
import { Alert } from 'react-native';

type ImagePickerButtonProps = {
  onImageSelected: (uri: string) => void;
};

export const ImagePickerButton = ({ onImageSelected }: ImagePickerButtonProps) => {
  const pickImage = async () => {
    // Gallery ဖွင့်ခွင့် တောင်းခြင်း
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery သုံးခွင့်ပေးမှ ဓာတ်ပုံရွေးလို့ရပါမယ်။');
      return;
    }

    // Gallery ဖွင့်ခြင်း
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // ပုံကို crop လုပ်ခွင့်ပေးခြင်း
      aspect: [9, 16],      // ဖုန်း screen size နဲ့ ကိုက်အောင် ညှိခြင်း
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      action="secondary" 
      className="bg-white/20 border-white rounded-full mt-4"
      onPress={pickImage}
    >
      <ButtonText className="text-white">Change Background</ButtonText>
    </Button>
  );
};