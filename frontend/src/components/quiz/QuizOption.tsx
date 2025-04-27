// QuizOption.tsx
import React from 'react'; // Import React for type safety if using JSX

// We need the id of the option and the parent's change handler
interface Props {
	optionId: string; // Added optionId
	text: string;
	type: 'single' | 'multiple' | 'true_false';
	name: string; // Used for grouping radio buttons
	isSelected: boolean; // Tells the component if it should be checked
	onSelectChange: (optionId: string, isSelected: boolean) => void; // Callback for when the input changes
}

export function QuizOption({
	optionId,
	text,
	type,
	name,
	isSelected,
	onSelectChange,
}: Props) {
	const inputType = type === 'multiple' ? 'checkbox' : 'radio';

	return (
		<label className="flex items-start gap-2 cursor-pointer">
			<input
				type={inputType}
				name={name}
				className="mt-1"
				checked={isSelected} // Controlled component: checked state is managed by parent
				onChange={(e) => onSelectChange(optionId, e.target.checked)} // Report change up
			/>
			<span>{text}</span>
		</label>
	);
}
