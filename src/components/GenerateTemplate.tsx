import { ITemplate } from "@/app/page";
import { GeistMono } from "geist/font";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export const GenerateTemplate: React.FC<ITemplate> = (props: ITemplate) => {
	const { title, templateText, variables } = props;
	const initializeVariableDictionary = (variables: string[]) => {
		const dict = new Map<string, string>();
		variables.forEach((variable) => {
			dict.set(variable, "");
		});
		return dict;
	};

	const [variableDict, setVariableDict] = useState<Map<string, string>>(
		initializeVariableDictionary(variables)
	);

	const highlightedTextRef = useRef<HTMLDivElement>(null);

	const replaceVariablesInTemplateTextAndDisplayTextinDiv = (
		templateText: string,
		variableDict: Map<string, string>,
		highlightedTextRef: HTMLDivElement
	) => {
		let finalText = templateText;
		console.log("Variable Values in Highlight Function", variableDict);
		variables.forEach((currWord) => {
			if (variableDict.has(currWord) && variableDict.get(currWord) !== "") {
				finalText = finalText.replace(
					`$.${currWord}`,
					`<em style="background-color:#064e3b !important;">${variableDict.get(
						currWord
					)}</em>`
				);
			} else {
				finalText = finalText.replace(
					`$.${currWord}`,
					`<em style="color:#dc2626 !important;">{${currWord}}</em>`
				);
			}
		});

		console.log({ finalText: finalText });
		highlightedTextRef.innerHTML = finalText;
	};
	const checkIfAllVariablesAreFilled = () => {
		let allVariablesFilled = true;
		variableDict.forEach((value) => {
			if (value === "") {
				allVariablesFilled = false;
			}
		});
		return allVariablesFilled;
	};

	useEffect(() => {
		console.log("variableDict", variableDict);
		if (highlightedTextRef.current && variableDict.size > 0) {
			replaceVariablesInTemplateTextAndDisplayTextinDiv(
				templateText,
				variableDict,
				highlightedTextRef.current
			);
		}
	}, [variableDict]);
	return (
		<div className="flex w-full flex-col justify-start bg-gray-900 rounded p-2">
			<div className="w-full">Variables</div>
			<div className="w-full grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-xs bg-indigo-950/60 rounded p-2">
				{variables.map((variable) => {
					return (
						<div className="mt-1 flex flex-col" key={variable}>
							<div>{variable}</div>
							<input
								className="text-black px-3 py-2 mt-1 rounded"
								onChange={(e) => {
									setVariableDict((prevDict) => {
										const newDict = new Map(prevDict);
										newDict.set(variable, e.target.value.trim());
										return newDict;
									});
								}}
								type="text"
							/>
						</div>
					);
				})}
			</div>
			<div className="mt-3 flex justify-between items-center text-white py-2">
				<span>Generated Text</span>{" "}
				<button
					className={`flex justify-between items-center text-xs p-2 rounded ${
						!checkIfAllVariablesAreFilled() ? "bg-red-600" : "bg-green-700"
					}`}
					onClick={async () => {
						if (highlightedTextRef.current) {
							const txt = highlightedTextRef.current.innerText;
							// alert(txt);
							try {
								await navigator.clipboard.writeText(txt);
								toast("Text copied to clipboard!", {
									icon: "📋",
								});
								// alert("Text copied to clipboard!");
							} catch (err) {
								console.error("Failed to copy text: ", err);
							}
						}
					}}
				>
					Copy{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
						/>
					</svg>
				</button>
			</div>
			<div
				ref={highlightedTextRef}
				className={`w-full whitespace-pre-line leading-5 border-2 border-purple-400 rounded text-xs p-2 ${GeistMono.className}`}
			></div>
		</div>
	);
};

export default GenerateTemplate;
