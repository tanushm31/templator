"use client";
import { ITemplate } from "@/app/page";
import { GeistSans } from "geist/font";

export const TemplateCard = (props: {
	tID: number;
	template: ITemplate;
	selected: boolean;
	onClickFn: (ip: number) => void;
}) => {
	const { template, selected } = props;
	const { title, variables, templateText } = template;
	return (
		<div
			onClick={() => {
				props.onClickFn(props.tID);
			}}
			className={`hover:cursor-pointer flex-col flex justify-between h-44 bg-blue-800/20 rounded p-3 text-xs ${
				selected ? "border-2 border-green-500" : ""
			}`}
		>
			<div className="text-xl font-bold">{title}</div>
			<div className="flex flex-wrap justify-start">
				{variables.map((variable) => (
					<span
						key={variable}
						className="rounded mb-2 mr-2 px-2.5 py-1 bg-purple-800"
					>
						{variable}
					</span>
				))}
			</div>
			{/* <div className="flex w-full h-10 text-gray-400 text-ellipsis overflow-clip text-wrap">
				{templateText}
			</div> */}
		</div>
	);
};
export const TemplateList = (props: {
	templates: ITemplate[];
	selectedTemplateId: number | undefined;
	setSelectedTemplateID: (ip: number) => void;
}) => {
	return (
		<div className="flex flex-col w-full mt-3">
			<div
				className={`${GeistSans.className} w-full flex justify-start items-center text-xl`}
			>
				Templates
			</div>
			<div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{props.templates.map((template, id) => {
					return (
						<TemplateCard
							tID={id}
							onClickFn={props.setSelectedTemplateID}
							key={id}
							template={template}
							selected={props.selectedTemplateId === id}
							// templateText={template.templateText}
							// title={template.title}
							// variables={template.variables}
						/>
					);
				})}
			</div>
		</div>
	);
};
