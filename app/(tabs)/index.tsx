import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";

// Import Custom Components
import { DateSelection } from "@/components/love-app/DateSelection";
import { ImagePickerButton } from "@/components/love-app/ImagePickerButton";
import { PartnerProfile } from "@/components/love-app/PartnerProfile";
import { TimeBox } from "@/components/love-app/TimeBox";

import { loadAppData, saveAppData } from "@/utils/storage";

export default function LoveApp() {
  const [partner1, setPartner1] = useState({
    name: "Min Min",
    birthDate: "2000-01-01",
    gender: "Male",
    image: null, // ပုံသိမ်းဖို့
  });

  const [partner2, setPartner2] = useState({
    name: "Su Su",
    birthDate: "2001-05-12",
    gender: "Female",
    image: null, // ပုံသိမ်းဖို့
  });

  const [anniversaryDate, setAnniversaryDate] = useState<Date>(
    new Date("2023-12-25"),
  );

  // const [showEditP1, setShowEditP1] = useState(false);
  // const [showEditP2, setShowEditP2] = useState(false);

  const [isEditingP1, setIsEditingP1] = useState(false);
  const [isEditingP2, setIsEditingP2] = useState(false);

  // Background Image State
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
  );

  const [isLoaded, setIsLoaded] = useState(false); // App ready ဖြစ်မဖြစ် စစ်ရန်

  // --- ၁။ App စဖွင့်ချိန်မှာ ဒေတာ ပြန်ဆွဲထုတ်ခြင်း ---
  useEffect(() => {
    const initData = async () => {
      const savedData = await loadAppData();
      if (savedData) {
        setPartner1(savedData.partner1);
        setPartner2(savedData.partner2);
        setAnniversaryDate(new Date(savedData.anniversaryDate)); // String ကို Date object ပြန်ပြောင်းပါ
        setBgImage(savedData.bgImage);
      }
      setIsLoaded(true);
    };
    initData();
  }, []);

  // --- ၂။ State တွေ ပြောင်းတိုင်း အလိုအလျောက် သိမ်းဆည်းခြင်း ---
  useEffect(() => {
    if (isLoaded) {
      // ပထမဆုံး load လုပ်ချိန်မှာ save မဖြစ်စေရန်
      const dataToSave = {
        partner1,
        partner2,
        anniversaryDate: anniversaryDate.toISOString(), // Date ကို string အဖြစ် သိမ်းရပါမယ်
        bgImage,
      };
      saveAppData(dataToSave);
    }
  }, [partner1, partner2, anniversaryDate, bgImage, isLoaded]);

  if (!isLoaded) return null; // ဒေတာတွေ မလာသေးခင် ဘာမှမပြသေးဘဲ စောင့်ပါ

  // Time Logic (ဒီမှာပဲ ထားနိုင်ပါတယ်)
  const calculateDuration = (startDate: Date) => {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // ရက်မပြည့်သေးရင် လထဲက တစ်လနုတ်ပြီး ရက်ပြန်ပေါင်းမယ်
    if (days < 0) {
      months--;
      // ရှေ့လမှာ ရက်ပေါင်းဘယ်လောက်ရှိလဲ ရှာပြီး ပေါင်းပေးတာ
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // လ အနှုတ်ပြနေရင် နှစ်ထဲက တစ်နှစ်နုတ်ပြီး လပေါင်းမယ်
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffInMs = now.getTime() - startDate.getTime();
    const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return {
      totalDays,
      years,
      months,
      days,
    };
  };

  const timeLeft = calculateDuration(anniversaryDate);

  //   const timer = setInterval(
  //     () => setTimeLeft(calculateDuration(anniversaryDate)),
  //     1000,
  //   );
  //   return () => clearInterval(timer);
  // }, [anniversaryDate]);

  return (
    <Box className="flex-1">
      <ImageBackground
        key={bgImage}
        source={{ uri: bgImage }}
        className="flex-1 justify-center items-center p-4"
      >
        <Box className="absolute inset-0 bg-black/30" />
        <ScrollView className="w-full mt-10">
          <VStack space="xl" className="items-center pb-20">
            <Card className="bg-white/80 backdrop-blur-md p-6 rounded-[40px] w-full items-center shadow-xl">
              <Heading size="md" className="text-pink-600 mb-2 italic">
                We've been together for
              </Heading>
              <Text className="text-5xl font-black text-slate-800">
                {timeLeft.totalDays}
              </Text>
              <Text className="text-xl font-bold text-slate-500 uppercase">
                Days
              </Text>

              <HStack space="md" className="mt-6 flex-wrap justify-center">
                <TimeBox label="Years" value={timeLeft.years} />
                <TimeBox label="Months" value={timeLeft.months} />
                <TimeBox label="Days" value={timeLeft.days} />
              </HStack>
            </Card>

            <HStack className="w-full justify-between px-4 mt-6 items-start">
              <PartnerProfile
                person={partner1}
                isEditing={isEditingP1}
                onUpdate={setPartner1}
                onToggleEdit={() => setIsEditingP1(!isEditingP1)}
              />

              <Text className="text-4xl mt-6 text-black">❤️</Text>

              <PartnerProfile
                person={partner2}
                isEditing={isEditingP2}
                onUpdate={setPartner2}
                onToggleEdit={() => setIsEditingP2(!isEditingP2)}
              />
            </HStack>
          </VStack>
        </ScrollView>

        <VStack className="w-full px-4">
          {/* Date Picker Button */}
          <DateSelection
            label="Anniversary Day"
            date={anniversaryDate}
            onDateChange={(newDate) => {
              // console.log("Main Screen received date:", newDate);
              setAnniversaryDate(newDate);
            }}
          />

          {/* Image Picker Button */}
          <ImagePickerButton onImageSelected={(uri) => setBgImage(uri)} />
        </VStack>
      </ImageBackground>
    </Box>
  );
}
