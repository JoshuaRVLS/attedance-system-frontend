import React, { useEffect, useRef } from "react";
import Image from "next/image";

const ShowPhoto = ({
  data,
  mimetype,
  setShowPhoto,
}: {
  data: Buffer;
  mimetype: string;
  setShowPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current?.contains(event.target as Node)) {
        setShowPhoto(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center fixed z-20 top-0 bottom-0 left-0 right-0 bg-black opacity-80"
    >
      <Image
        className="opacity-100 border-black shadow-lg border object-cover rounded-full size-96"
        src={`data:${mimetype};base64,${Buffer.from(data).toString("base64")}`}
        width={70}
        height={70}
        alt="profile_photo"
      />
    </div>
  );
};

export default ShowPhoto;
