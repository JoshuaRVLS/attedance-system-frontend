"use client";

import React from "react";

const FormPage = ({ params }: { params: Promise<{ classId: string }> }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { classId } = React.use(params);

  return (
    <div className="w-full h-full justify-center items-center">
      <div className="bg-primary p-2">AWD</div>
    </div>
  );
};

export default FormPage;
