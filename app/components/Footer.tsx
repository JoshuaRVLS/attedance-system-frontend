import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-bg border p-2.5 border-black fixed bottom-0 left-0 right-0 flex gap-3 justify-center w-full">
      <Link
        href={"/attedance/057bf7db-29d2-4ea1-adaa-057158a85811"}
        className="text-gray-400"
      >
        XII A
      </Link>
      <Link
        href={"/attedance/391084e9-988d-48a2-a70b-90ef9f38b2b2"}
        className="text-gray-400"
      >
        XII B
      </Link>
      <Link
        href={"/attedance/b358097f-f51a-485c-a8cb-023de0e82549"}
        className="text-gray-400"
      >
        XII C
      </Link>
      <Link
        href={"/attedance/09e988a5-fabb-42d1-8113-7e5044175fdb"}
        className="text-gray-400"
      >
        XII D
      </Link>
      <Link
        href={"/attedance/585f76ae-2de2-4d88-a44e-ae7ca131bec7"}
        className="text-gray-400"
      >
        XII E
      </Link>
    </div>
  );
};

export default Footer;
