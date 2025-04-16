interface Explanation {
    term: string;
    description: string;
  }
  
  export function ExplanationsList({ explanations }: { explanations: Explanation[] }) {
    return (
      <div className="border rounded-md p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Пояснения</h2>
        <ul className="space-y-2">
          {explanations.map((item, idx) => (
            <li key={idx}>
              <strong>{item.term}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  