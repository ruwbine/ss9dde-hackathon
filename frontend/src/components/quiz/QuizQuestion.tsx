// QuizQuestion.tsx
import { QuizOption } from './QuizOption';
import { BackendQuizQuestion, UserAnswers } from './types'; // Import types

interface Props {
	index: number;
	question: BackendQuizQuestion; // Use the backend type
	// Pass down the currently selected options for this question from QuizView
	selectedOptionIds: string[];
	// Callback to update the answers state in QuizView
	onOptionChange: (
		questionId: string,
		optionId: string,
		isSelected: boolean
	) => void;
}

export function QuizQuestion({
	question,
	index,
	selectedOptionIds,
	onOptionChange,
}: Props) {
	const handleOptionChange = (optionId: string, isSelected: boolean) => {
		// Call the parent handler, passing the question ID and option change details
		onOptionChange(question.id, optionId, isSelected);
	};

	return (
		<div className="border p-4 rounded-md space-y-3">
			<p className="font-medium">
				{index}. {question.text}
			</p>

			<div className="space-y-2">
				{question.options.map((opt) => (
					<QuizOption
						key={opt.id} // Use option ID as key
						optionId={opt.id} // Pass option ID
						text={opt.text}
						type={question.type}
						name={question.id} // Use question ID as name for radio groups
						isSelected={selectedOptionIds.includes(opt.id)} // Determine if this option is selected
						onSelectChange={handleOptionChange} // Pass local handler
					/>
				))}
			</div>
		</div>
	);
}
