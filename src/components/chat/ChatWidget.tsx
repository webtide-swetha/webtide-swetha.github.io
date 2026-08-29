import { lazy, Suspense } from "react";

const ChatWidgetInner = lazy(() =>
  import("./ChatWidgetInner").then((mod) => ({ default: mod.ChatWidgetInner })),
);

export function ChatWidget() {
  return (
    <Suspense fallback={null}>
      <ChatWidgetInner />
    </Suspense>
  );
}
