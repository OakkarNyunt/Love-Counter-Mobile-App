import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

export const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <VStack className="items-center bg-white/50 p-3 rounded-2xl min-w-[70px]">
    <Text className="text-lg font-bold text-pink-700">{value}</Text>
    <Text size="xs" className="text-slate-600 font-bold uppercase">
      {label}
    </Text>
  </VStack>
);
