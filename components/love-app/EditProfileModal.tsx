import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const EditProfileModal = ({
  isOpen,
  onClose,
  person,
  onSave,
  title,
}: any) => {
  const [tempName, setTempName] = useState(person.name);
  const [tempBirth, setTempBirth] = useState(person.birthDate);
  const [tempGender, setTempGender] = useState(person.gender);

  useEffect(() => {
    if (isOpen) {
      setTempName(person.name);
      setTempBirth(person.birthDate);
      setTempGender(person.gender);
    }
  }, [isOpen, person]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      {/* အပြင်ဘက်ကွက်လပ်ကို နှိပ်ရင် ပိတ်သွားစေဖို့ */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              <VStack
                space="lg"
                className="bg-white p-6 rounded-[30px] w-full shadow-2xl"
              >
                <Heading size="xl" className="text-slate-800 mb-2">
                  {title}
                </Heading>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Name</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="md" className="rounded-xl">
                    <InputField value={tempName} onChangeText={setTempName} />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Birth Date</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="md" className="rounded-xl">
                    <InputField value={tempBirth} onChangeText={setTempBirth} />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Gender</FormControlLabelText>
                  </FormControlLabel>
                  <Button
                    variant="outline"
                    className="rounded-xl border-slate-300"
                    onPress={() =>
                      setTempGender(tempGender === "Male" ? "Female" : "Male")
                    }
                  >
                    <ButtonText className="text-slate-700">
                      {tempGender}
                    </ButtonText>
                  </Button>
                </FormControl>

                <VStack space="sm" className="mt-4">
                  <Button
                    className="bg-pink-600 rounded-xl h-12"
                    onPress={() => {
                      onSave({
                        name: tempName,
                        birthDate: tempBirth,
                        gender: tempGender,
                      });
                      onClose();
                    }}
                  >
                    <ButtonText>Save Changes</ButtonText>
                  </Button>

                  <Button variant="link" onPress={onClose}>
                    <ButtonText className="text-slate-400">Cancel</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // နောက်ခံကို မှောင်သွားစေဖို့
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
  },
});
