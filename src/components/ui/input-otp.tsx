"use client";

import * as React from "react";
import { OTPInput, OTPInputContext, OTPInputProps } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

// Define prop types for InputOTP
interface InputOTPProps extends Omit<OTPInputProps, 'value'> {
  className?: string;
  containerClassName?: string;
  value?: string; // Explicitly define value as string
}

// Forward ref with types for InputOTP
const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props as OTPInputProps} // Type cast here to match OTPInputProps
    />
  )
);
InputOTP.displayName = "InputOTP";

// Define prop types for InputOTPGroup
interface InputOTPGroupProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

// Forward ref with types for InputOTPGroup
const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

// Define prop types for InputOTPSlot
interface InputOTPSlotProps extends React.HTMLProps<HTMLDivElement> {
  index: number;
  className?: string;
}

// Forward ref with types for InputOTPSlot
const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-20 w-20 items-center justify-center  border-2  border-neutral-300  text-lg transition-all rounded-md",
          isActive && "z-10 ring-2 ring-ring ring-offset-background",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

// Define prop types for InputOTPSeparator
interface InputOTPSeparatorProps extends React.HTMLProps<HTMLDivElement> { }

// Forward ref with types for InputOTPSeparator
const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  (props, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  )
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
