import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cityData = {
  1800: { color: "#8B5E3C", info: "A small village with simple houses and dirt roads." },
  2000: { color: "#A9A9A9", info: "A modern city with skyscrapers and busy streets." },
  2050: { color: "#00CED1", info: "A futuristic city with flying cars and AI-controlled infrastructure." },
};

const City = ({ color }) => (
  <mesh>
    <boxGeometry args={[3, 3, 3]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default function TimeTravelNavigation() {
  const [year, setYear] = useState(2000);

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">Interactive Time Travel Navigation</h1>
      
      <Card className="p-4 w-96">
        <CardContent>
          <p className="text-lg">Year: {year}</p>
          <p className="mt-2 text-sm">{cityData[year]?.info}</p>
        </CardContent>
      </Card>
      
      <Canvas className="w-full h-64 bg-gray-800 rounded-lg">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <City color={cityData[year]?.color || "gray"} />
        <OrbitControls />
      </Canvas>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-3/4"
      >
        <Slider
          min={1800}
          max={2050}
          step={50}
          value={[year]}
          onValueChange={(val) => setYear(val[0])}
        />
      </motion.div>
      
      <div className="flex space-x-4">
        <Button onClick={() => setYear(1800)}>Past</Button>
        <Button onClick={() => setYear(2050)}>Future</Button>
      </div>
    </div>
  );
}
