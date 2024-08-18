import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BotMessageSquare } from "lucide-react";
import { Badge } from "./badge";

export default function AlertDialog({
  title,
  description,
  triggerLabel = "Open",
  closeLabel = "Close",
  acceptLabel = "Accept",
  onClick,
  variant = "default",
  size = "default",
  acceptDelay = 5000,
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  React.useEffect(() => {
    if (open) {
      setCountdown(acceptDelay / 1000); // Reset countdown when dialog/drawer is opened
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [open, acceptDelay]);

  const handleAccept = () => {
    if (onClick) onClick();
    setOpen(false);
  };

  const CommonContent = () => (
    <>
      <div className="flex items-start gap-4">
        <Badge variant={variant} className="rounded-full size-12">
          <BotMessageSquare className="size-7" />
        </Badge>
        <div className="space-y-1.5 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-6">
        <DialogClose asChild>
          <Button variant="outline">{closeLabel}</Button>
        </DialogClose>
        <Button
          onClick={handleAccept}
          variant={variant}
          disabled={countdown > 0 || disabled}
        >
          {countdown > 0 ? `${acceptLabel} ( ${countdown}s )` : acceptLabel}
        </Button>
      </div>
    </>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size={size} disabled={disabled}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>{CommonContent()}</DialogHeader>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline" size={size} disabled={disabled}>
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>{CommonContent()}</DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
