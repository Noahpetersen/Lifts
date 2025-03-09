import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";
import Timer from "./Timer";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const TimerDrawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Rest</DrawerTitle>
            <DrawerDescription>Rest 2-3 minutes between heavy sets</DrawerDescription>
          </DrawerHeader>
          <Timer setIsOpen={setIsOpen}/>
          <DrawerFooter>
            </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TimerDrawer;
