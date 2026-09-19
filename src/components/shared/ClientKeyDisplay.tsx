import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ClientKeyDisplayProps = {
  clientKey: string;
};

export function ClientKeyDisplay({ clientKey }: ClientKeyDisplayProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(clientKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access isn't available; the key is still visible to copy manually.
    }
  }

  return (
    <div className="flex items-center gap-2">
      <code className="rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-semibold tracking-wide">
        {clientKey}
      </code>
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        onClick={handleCopy}
        aria-label="Copy client key"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
