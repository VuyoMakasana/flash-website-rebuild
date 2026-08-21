import '../styles/legal.css';

export default function LegalBlocks({ blocks }) {
  return (
    <div className="legal-blocks">
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
        if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
        if (block.type === 'ul') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          );
        }
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
