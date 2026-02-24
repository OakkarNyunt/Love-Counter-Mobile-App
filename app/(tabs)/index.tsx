import { DateSelection } from "@/components/love-app/DateSelection";
import { ImagePickerButton } from "@/components/love-app/ImagePickerButton";
import { PartnerProfile } from "@/components/love-app/PartnerProfile";
import { TimeBox } from "@/components/love-app/TimeBox";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { loadAppData, saveAppData } from "@/utils/storage";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  startOfDay,
} from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ImageBackground,
  Text as RNText,
  ScrollView,
  View,
} from "react-native";

export default function LoveApp() {
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const [partner1, setPartner1] = useState({
    name: "Min Min",
    birthDate: "2000-01-01",
    gender: "Male",
    image: null,
  });
  const [partner2, setPartner2] = useState({
    name: "Su Su",
    birthDate: "2001-05-12",
    gender: "Female",
    image: null,
  });
  const [anniversaryDate, setAnniversaryDate] = useState<Date>(
    new Date("2023-12-25"),
  );
  const [isEditingP1, setIsEditingP1] = useState(false);
  const [isEditingP2, setIsEditingP2] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
  );

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initData = async () => {
      const savedData = await loadAppData();
      if (savedData) {
        setPartner1(savedData.partner1);
        setPartner2(savedData.partner2);
        setAnniversaryDate(new Date(savedData.anniversaryDate));
        setBgImage(savedData.bgImage);
      }
      setIsLoaded(true);
    };
    initData();
  }, []);

  useEffect(() => {
    // Animation Loop ကို တိတိကျကျ စတင်ပါ
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.4, // ၁.၄ ဆ အထိ ကြီးမယ်
          duration: 800,
          useNativeDriver: false, // တွက်ချက်မှုကို JS ဘက်ကပဲ အရင်စမ်းမယ်
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
    );

    pulse.start();

    return () => pulse.stop(); // Component ပိတ်ရင် ရပ်မယ်
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveAppData({
        partner1,
        partner2,
        anniversaryDate: anniversaryDate.toISOString(),
        bgImage,
      });
    }
  }, [partner1, partner2, anniversaryDate, bgImage, isLoaded]);

  const calculateTimeDifference = (selectedDate: Date) => {
    const today = startOfDay(new Date());
    const startDate = startOfDay(selectedDate);
    if (startDate > today)
      return { totalDays: 0, years: 0, months: 0, days: 0 };
    const totalDays = differenceInDays(today, startDate);
    const years = differenceInYears(today, startDate);
    const dateAfterYears = new Date(startDate);
    dateAfterYears.setFullYear(startDate.getFullYear() + years);
    const months = differenceInMonths(today, dateAfterYears);
    const dateAfterMonths = new Date(dateAfterYears);
    dateAfterMonths.setMonth(dateAfterYears.getMonth() + months);
    const days = differenceInDays(today, dateAfterMonths);
    return { totalDays, years, months, days };
  };

  if (!isLoaded) return null;

  const timeLeft = calculateTimeDifference(anniversaryDate);

  return (
    <Box className="flex-1">
      <ImageBackground
        key={bgImage}
        source={{ uri: bgImage }}
        className="flex-1 justify-center items-center p-4"
        blurRadius={10}
      >
        <Box className="absolute inset-0 bg-black/40" />
        <ScrollView
          className="w-full mt-10"
          showsVerticalScrollIndicator={false}
        >
          <VStack space="xl" className="items-center pb-20">
            <Card className="bg-white/20 backdrop-blur-lg p-6 rounded-[40px] w-full items-center shadow-2xl border border-white/20">
              <Heading
                size="md"
                className="text-pink-400 mb-2 italic font-semibold"
              >
                We've been together for
              </Heading>
              <Text className="text-6xl font-black text-white">
                {timeLeft.totalDays}
              </Text>
              <Text className="text-sm font-bold text-white/60 uppercase tracking-widest mt-1">
                Days
              </Text>
              <HStack space="md" className="mt-8 flex-wrap justify-center">
                <TimeBox label="Years" value={timeLeft.years} />
                <TimeBox label="Months" value={timeLeft.months} />
                <TimeBox label="Days" value={timeLeft.days} />
              </HStack>
            </Card>

            <VStack className="w-full items-center mt-6">
              <HStack className="w-full justify-between px-2 items-start">
                <PartnerProfile
                  person={partner1}
                  isEditing={isEditingP1}
                  onUpdate={setPartner1}
                  onToggleEdit={() => setIsEditingP1(!isEditingP1)}
                />
                <PartnerProfile
                  person={partner2}
                  isEditing={isEditingP2}
                  onUpdate={setPartner2}
                  onToggleEdit={() => setIsEditingP2(!isEditingP2)}
                />
              </HStack>

              {/* နှလုံးသား Animation အပိုင်း */}
              <View
                style={{
                  height: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: scaleAnim }], // scaleAnim ကို ဒီမှာ ချိတ်ပါတယ်
                    zIndex: 10,
                  }}
                >
                  <RNText style={{ fontSize: 70 }}>❤️</RNText>
                </Animated.View>
              </View>
            </VStack>
          </VStack>
        </ScrollView>

        <VStack className="w-full px-4 mb-4" space="md">
          <DateSelection
            label="Anniversary"
            date={anniversaryDate}
            onDateChange={(newDate) => setAnniversaryDate(newDate)}
          />
          <ImagePickerButton onImageSelected={(uri) => setBgImage(uri)} />
        </VStack>
      </ImageBackground>
    </Box>
  );
}
