import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { reverse } from "dns";

interface SetData {
  createdAt: string;
  reps: number;
  weight: string;
}

interface SetDetailsChartProps {
  chartData: SetData[];
}

const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function SetDetailsChart({ chartData }: SetDetailsChartProps) {
    const [newChartData, setNewChartData] = useState<SetData[]>([]);

    useEffect(() => {
        const reversedChartData = chartData.slice().reverse();
        setNewChartData(reversedChartData);
    }, [chartData]);

    const getAllTimeProgression = (data: SetData[]) => {
        if (!data || data.length === 0) return 0;

        const firstSet = data[0];
        const lastSet = data[data.length - 1];

        const firstSetWeight = parseFloat(firstSet.weight);
        const lastSetWeight = parseFloat(lastSet.weight);

        const progression = ((lastSetWeight - firstSetWeight) / firstSetWeight) * 100;

        return progression;
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression</CardTitle>
        <CardDescription>Your recent workout progression</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={newChartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            {/* Hide the X-Axis since it's not sorted by time */}
            <XAxis hide dataKey="createdAt" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="weight"
              type="natural"
              stroke="#FAFAFA" // ✅ Primary theme color
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="font-medium flex gap-1 items-center">
          <span className="">{getAllTimeProgression(newChartData)}%</span><TrendingUp className="h-4 w-4 text-[#13A100]" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default SetDetailsChart;
