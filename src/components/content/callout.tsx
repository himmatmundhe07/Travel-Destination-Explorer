import { AlertIcon, InfoIcon } from "@/components/ui/icons";
import type { CalloutVariant } from "@/lib/types";
import { InlineText } from "./inline-text";

const styles: Record<CalloutVariant, { box: string; label: string; icon: string }> = {
  info: {
    box: "border-brand bg-brand-soft/70",
    label: "text-brand",
    icon: "text-brand",
  },
  warning: {
    box: "border-warn-line bg-warn-soft",
    label: "text-warn",
    icon: "text-warn",
  },
};

export function Callout({
  variant,
  label,
  text,
}: {
  variant: CalloutVariant;
  label: string;
  text: string;
}) {
  const style = styles[variant];
  const Icon = variant === "warning" ? AlertIcon : InfoIcon;
  return (
    <aside className={`flex gap-3 rounded-r-md border-l-[3px] px-4 py-3.5 ${style.box}`}>
      <Icon className={`mt-0.5 size-4 shrink-0 ${style.icon}`} />
      <p className="text-[13.5px] leading-6 text-ink-muted">
        <strong className={`font-semibold ${style.label}`}>{label}</strong>{" "}
        <InlineText text={text} />
      </p>
    </aside>
  );
}
