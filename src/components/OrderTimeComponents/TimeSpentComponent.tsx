import React from 'react';
import { Td } from "@chakra-ui/table";
import { Box, Text } from "@chakra-ui/react";

interface TimeSpentProps {
    timeSpent: number;
    flagColor: string;
    isTable?: boolean
}

const TimeSpentComponent: React.FC<TimeSpentProps> = ({ timeSpent, flagColor, isTable = true }) => {
    // Convert total seconds into days, hours, minutes, and seconds.
    const days = Math.floor(timeSpent / (60 * 60 * 24));
    const hours = Math.floor((timeSpent % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeSpent % (60 * 60)) / 60);
    const seconds = timeSpent % 60;

    const formattedTimeParts = [];
    if (days > 0) formattedTimeParts.push(`${days}d`);
    if (hours > 0) formattedTimeParts.push(`${hours}h`);
    if (minutes > 0) formattedTimeParts.push(`${minutes}m`);
    formattedTimeParts.push(`${seconds}s`);
    const formattedTime = formattedTimeParts.join(' ');

    return (
        isTable
        ?
        <Td>
            {flagColor === 'yellow' && (
                <Text as="span" color="red.500" fontWeight="bold">
                    {formattedTime} <span className="yellow-flag"> 🟨</span>
                </Text>
            )}

            {flagColor === 'red' && (
                <Text as="span" color="red.500" fontWeight="bold">
                    {formattedTime} <span className="red-flag"> 🚩</span>
                </Text>
            )}
        </Td>
        :
        <Box>
             {flagColor === 'yellow' && (
                <>
                    <Text fontWeight="bold" color="gray.600">
                    Time Spent
                    </Text>
                    <Text color="yellow.600">{days} days, {hours % 24} hours, {minutes % 60} minutes {seconds % 60} seconds <span className="yellow-flag"> 🟨</span></Text>
                </>
            )}

              {flagColor === 'red' && (
                <>
                    <Text fontWeight="bold" color="gray.600">
                    Time Spent
                    </Text>
                    <Text color="red.600">{days} days, {hours % 24} hours, {minutes % 60} minutes {seconds % 60} seconds <span className="red-flag"> 🚩</span></Text> 
                </>
            )}
        </Box>
    );
};

export default TimeSpentComponent;