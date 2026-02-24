import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FontAwesome } from "@expo/vector-icons"; // Icon အတွက်
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Pressable } from "react-native";

export const PartnerProfile = ({
  person,
  isEditing,
  onUpdate,
  onToggleEdit,
}: any) => {
  // ဖုန်းထဲက ပုံရွေးတဲ့ function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onUpdate({ ...person, image: result.assets[0].uri });
    }
  };

  if (isEditing) {
    return (
      <VStack
        space="md"
        className="items-center bg-white/95 p-4 rounded-[30px] w-[160px] shadow-2xl"
      >
        {/* ပုံပြင်ရန် နေရာ */}
        <Pressable onPress={pickImage} className="relative">
          <Box className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-pink-500">
            {person.image ? (
              <Image source={{ uri: person.image }} className="w-full h-full" />
            ) : (
              <Box className="flex-1 items-center justify-center">
                <FontAwesome name="camera" size={20} color="#94a3b8" />
              </Box>
            )}
          </Box>
          <Box className="absolute bottom-0 right-0 bg-pink-500 p-1 rounded-full border-2 border-white">
            <FontAwesome name="plus" size={10} color="white" />
          </Box>
        </Pressable>

        {/* နာမည်ပြင်ရန် */}
        <Input size="sm" className="bg-white border-slate-300 rounded-xl h-9">
          <InputField
            value={person.name}
            onChangeText={(txt) => onUpdate({ ...person, name: txt })}
            className="text-slate-900 text-center"
            placeholder="Name"
          />
        </Input>

        {/* Gender Icon ပြောင်းရန် */}
        <Pressable
          onPress={() =>
            onUpdate({
              ...person,
              gender: person.gender === "Male" ? "Female" : "Male",
            })
          }
          className="flex-row items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full"
        >
          <FontAwesome
            name={person.gender === "Male" ? "mars" : "venus"}
            size={16}
            color={person.gender === "Male" ? "#3b82f6" : "#ec4899"}
          />
          <Text className="text-slate-600 text-xs ml-1">{person.gender}</Text>
        </Pressable>

        <Button
          size="xs"
          className="bg-pink-600 w-full rounded-xl"
          onPress={onToggleEdit}
        >
          <ButtonText>Done</ButtonText>
        </Button>
      </VStack>
    );
  }

  // ရိုးရိုး View Mode
  return (
    <Pressable onPress={onToggleEdit} className="items-center">
      <VStack className="items-center">
        <Box className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/50 p-1 shadow-lg">
          <Box className="flex-1 rounded-full overflow-hidden bg-pink-100 items-center justify-center">
            {person.image ? (
              <Image source={{ uri: person.image }} className="w-full h-full" />
            ) : (
              <FontAwesome
                name={person.gender === "Male" ? "user" : "user"}
                size={40}
                color="#ec4899"
              />
            )}
          </Box>
          {/* Gender Icon လေးကို ဘေးမှာ ကပ်ပြမယ် */}
          <Box
            className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-white ${person.gender === "Male" ? "bg-blue-500" : "bg-pink-500"}`}
          >
            <FontAwesome
              name={person.gender === "Male" ? "mars" : "venus"}
              size={12}
              color="white"
            />
          </Box>
        </Box>
        <Text className="text-white font-bold mt-3 text-xl shadow-lg">
          {person.name}
        </Text>
      </VStack>
    </Pressable>
  );
};
