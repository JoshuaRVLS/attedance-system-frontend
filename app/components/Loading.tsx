import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const Loading = ({ text, duration }: { text: string; duration: number }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -20 }}
      transition={{ duration, repeat: Infinity, repeatType: "reverse" }}
      className="flex justify-center items-center flex-col gap-2 absolute top-0 bottom-0 left-0 right-0"
    >
      <Image src={"/logo.png"} width={50} height={50} alt={"logo"} />
      <span className="font-montserrat font-light">{text}</span>
    </motion.div>
  );
};

export default Loading;
