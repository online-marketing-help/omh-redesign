"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Retry the original asset if optimisation fails, then use a bundled photograph.
export default function SiteImage(props: ImageProps) {
  return <RecoverableImage key={typeof props.src === "string" ? props.src : JSON.stringify(props.src)} {...props} />;
}

function RecoverableImage({ src, alt, onError, unoptimized, ...props }: ImageProps) {
  const [failures, setFailures] = useState(0);
  return (
    <Image
      {...props}
      src={failures < 2 ? src : "/images/home/agency-collaboration.webp"}
      alt={failures < 2 ? alt : "Agency team collaborating on a marketing project"}
      unoptimized={unoptimized || failures > 0}
      onError={(event) => {
        if (failures < 2) setFailures(failures + 1);
        onError?.(event);
      }}
    />
  );
}
