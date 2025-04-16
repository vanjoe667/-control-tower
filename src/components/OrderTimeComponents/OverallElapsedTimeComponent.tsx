import React from 'react';
import { Td } from "@chakra-ui/table";
import { Box, Text } from "@chakra-ui/react";

interface OverallElapsedTimeProps {
  overallElapsedTime: number;
  orderCompletionThreshold: number;
  isTable?: boolean
}

const OverallElapsedTimeComponent: React.FC<OverallElapsedTimeProps> = ({ overallElapsedTime, orderCompletionThreshold, isTable = true }) => {
  // Convert total seconds into days, hours, minutes, and seconds
  const days = Math.floor(overallElapsedTime / (60 * 60 * 24)); // Total seconds in a day = 60 * 60 * 24
  const hours = Math.floor((overallElapsedTime % (60 * 60 * 24)) / (60 * 60)); // Remaining seconds converted to hours
  const minutes = Math.floor((overallElapsedTime % (60 * 60)) / 60); // Remaining seconds converted to minutes
  const seconds = overallElapsedTime % 60; // Remaining seconds

  // Format the output
  const timeParts = [];
  if (days > 0) timeParts.push(`${days}d`);
  if (hours > 0) timeParts.push(`${hours}h`);
  if (minutes > 0) timeParts.push(`${minutes}m`);
  timeParts.push(`${seconds}s`);
  const formattedTime = timeParts.join(' ');

  console.log({
    formattedTime,
    overallElapsedTime,
    orderCompletionThreshold
  })

  return (
    isTable
    ?
    <Td>
      {overallElapsedTime > orderCompletionThreshold && (
        <Text as="span" color="red.500" fontWeight="bold">
            {formattedTime} <span className="red-flag"> 🚩</span>
        </Text>
        )}
    </Td>
    :
    <Box>
        <Text fontWeight="bold" color="gray.600">
        Total Elapsed Time
        </Text>
        <Text color="red.500">{days} days, {hours % 24} hours, {minutes % 60} minutes {seconds % 60} seconds</Text>
    </Box>
  );
};

export default OverallElapsedTimeComponent;