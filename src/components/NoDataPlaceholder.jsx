function NoDataPlaceholder({ header, body, children }) {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center p-4">
        <h3 className="text-2xl font-bold tracking-tight">{header}</h3>
        <p className="text-sm text-muted-foreground mb-4">{body}</p>
        {children}
      </div>
    </div>
  );
}

export default NoDataPlaceholder;
