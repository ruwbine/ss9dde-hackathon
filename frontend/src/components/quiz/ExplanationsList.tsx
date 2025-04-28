interface Explanation {
  term: string;
  description: string;
}

export function ExplanationsList({ explanations }: { explanations: Explanation[] }) {
  return (
    <div className="mt-6 p-4 border border-dashed rounded-md bg-gray-50">
      <h3 className="font-semibold mb-2">Пояснения:</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        {explanations.map((item, i) => (
          <li key={i}>
            <strong>{item.term}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
