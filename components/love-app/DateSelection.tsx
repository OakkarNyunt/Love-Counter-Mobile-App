import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform } from "react-native";

interface DateSelectionProps {
  date: Date;
  onDateChange: (date: Date) => void;
  label: string;
}

export const DateSelection: React.FC<DateSelectionProps> = ({
  date,
  onDateChange,
  label,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // ၁။ Android အတွက် Picker ကို အရင်ပိတ်ပါ
    if (Platform.OS === "android") {
      setShow(false);
    }

    // ၂။ 'set' ဆိုတာ OK နှိပ်လိုက်တာကို ပြောတာပါ
    if (event.type === "set" && selectedDate) {
      // console.log("Selected Date: ", selectedDate); // Debug လုပ်ဖို့ console ထုတ်ကြည့်ပါ
      onDateChange(selectedDate); // Main State ကို ပို့ပေးမယ်
    } else {
      // User က Cancel နှိပ်ရင် ဒါမှမဟုတ် အပြင်ကို နှိပ်ရင်
      setShow(false);
    }
  };

  return (
    <HStack className="items-center justify-between w-full p-4 bg-white/10 border border-white/20 rounded-2xl mt-4">
      <Text className="text-white font-bold">{label}:</Text>

      <Button
        size="sm"
        variant="solid"
        className="bg-pink-500"
        onPress={() => setShow(true)}
      >
        <ButtonText>
          {/* Date အမှန်တကယ် ရှိမရှိ သေချာစစ်ပါ */}
          {date instanceof Date
            ? date.toLocaleDateString("en-GB")
            : "Select Date"}
        </ButtonText>
      </Button>

      {show && (
        <DateTimePicker
          value={date instanceof Date ? date : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          maximumDate={new Date()} // အနာဂတ် ရွေးမရအောင်
        />
      )}
    </HStack>
  );
};
