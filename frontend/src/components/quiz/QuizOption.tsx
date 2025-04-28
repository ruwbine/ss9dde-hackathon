interface Props {
    text: string;
    type: "single" | "multiple" | "true_false";
    name: string;
  }
  
  export function QuizOption({ text, type, name }: Props) {
    const inputType = type === "multiple" ? "checkbox" : "radio";
  
    return (
      <label className="flex items-start gap-2 cursor-pointer">
        <input type={inputType} name={name} className="mt-1" />
        <span>{text}</span>
      </label>
    );
  }
  