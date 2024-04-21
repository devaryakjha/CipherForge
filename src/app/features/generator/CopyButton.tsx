"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const CopyButton = ({
  copyPassword,
}: {
  copyPassword: VoidFunction;
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        copyPassword();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      type="button"
      aria-label="Copy password to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
};
