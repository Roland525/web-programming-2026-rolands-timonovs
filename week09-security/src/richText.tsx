export function renderRichText(text: string) {
  return text.split("\n").map((line, lineIndex) => {
    const parts = line.split("**");
    return (
      <span key={lineIndex}>
        {lineIndex > 0 && <br />}
        {parts.map((part, index) => {
          if (index % 2 === 0) return part;
          if (index === parts.length - 1) return "**" + part;
          return <strong key={index}>{part}</strong>;
        })}
      </span>
    );
  });
}
