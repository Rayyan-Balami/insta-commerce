import { BotMessageSquare } from "lucide-react";

function NoDataPlaceholder({ header, body, children }) {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-2 text-center p-4">
        <div className="p-4 bg-muted rounded-full mb-4 grid place-content-center">
          <BotMessageSquare className="size-10" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{header}</h3>
        <p className="text-sm text-muted-foreground mb-4">{body}</p>
        {children}
      </div>
    </div>
  );
}

export default NoDataPlaceholder;
