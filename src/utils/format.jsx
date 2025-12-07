export const parseBold = (text) => {
  return text.split(/(\*\*.*?\*\*)/g).map((chunk, idx) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold opacity-100">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    return chunk;
  });
};

export const ResponseFormatter = ({ text, theme }) => {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="leading-relaxed space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
          const lang = match ? match[1] : "";
          const code = match ? match[2] : part.slice(3, -3);
          return (
            <div
              key={index}
              className={`my-3 p-4 rounded-lg text-xs font-mono overflow-x-auto border ${theme.border} ${
                theme.name === "Executive Trust"
                  ? "bg-slate-200 text-slate-900"
                  : "bg-black/50 text-gray-200"
              }`}
            >
              {lang && (
                <div className="opacity-50 mb-1 text-[10px] uppercase">{lang}</div>
              )}
              <pre className="whitespace-pre">{code}</pre>
            </div>
          );
        }
        return (
          <div key={index}>
            {part.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} className="h-2" />;
              if (trimmed.startsWith("### "))
                return (
                  <h4 key={i} className="text-lg font-bold mt-2 mb-1">
                    {parseBold(trimmed.slice(4))}
                  </h4>
                );
              if (trimmed.startsWith("## "))
                return (
                  <h3 key={i} className="text-xl font-bold mt-3 mb-2">
                    {parseBold(trimmed.slice(3))}
                  </h3>
                );
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
                return (
                  <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full opacity-70 shrink-0 ${theme.accentBg}`}
                    />
                    <span>{parseBold(trimmed.replace(/^[*\-•]\s/, ""))}</span>
                  </div>
                );
              }
              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                    <span className="font-mono opacity-70 shrink-0">{trimmed.match(/^\d+\./)[0]}</span>
                    <span>{parseBold(trimmed.replace(/^\d+\.\s/, ""))}</span>
                  </div>
                );
              }
              return (
                <div key={i} className="mb-1">
                  {parseBold(line)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
