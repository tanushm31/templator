"use client";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { useEffect, useRef, useState } from "react";
import GenerateTemplate from "@/components/GenerateTemplate";
import ResumeSaveSection from "@/components/ResumeSaver";

export type ITemplate = {
	title: string;
	templateText: string;
	variables: string[];
	// resumeAttachedFlag: "resumelink" | "attached" | "none";
};

export const templates: ITemplate[] = [
	{
		title: "Std LinkedIN",
		templateText: `
    Hi $.userName,

    It's great connecting with you. How have you been?
    
    I found a job opportunity at $.companyName which perfectly overlaps with my skillset and wanted to check if you could provide me with a refferal for the same.
    
    Here is the job link:
    $.jobLink
    
    Here is a link to my resume: 
    #.resumeLink

    Looking forward to hearing back from you, thank you for your time and consideration.
    

    Best Regards,
    Tanush
    `,
		variables: ["userName", "jobLink", "companyName"],
		// resumeAttachedFlag
	},
	{
		title: "Std LinkedIN",
		templateText: `
    Hi $.userName,

    It's great connecting with you. How have you been?
    
    I found a job opportunity at $.companyName which perfectly overlaps with my skillset and wanted to check if you could provide me with a refferal for the same.
    
    Here is the job link:
    $.jobLink
    
    Here is a link to my resume: 
    #.resumeLink

    Looking forward to hearing back from you, thank you for your time and consideration.
    

    Best Regards,
    Tanush
    `,
		variables: ["userName", "jobLink", "companyName"],
		// resumeAttachedFlag
	},
	{
		title: "Std LinkedIN",
		templateText: `
    Hi $.userName,

    It's great connecting with you. How have you been?
    
    I found a job opportunity at $.companyName which perfectly overlaps with my skillset and wanted to check if you could provide me with a refferal for the same.
    
    Here is the job link:
    $.jobLink
    
    Here is a link to my resume: 
    #.resumeLink

    Looking forward to hearing back from you, thank you for your time and consideration.
    

    Best Regards,
    Tanush
    `,
		variables: ["userName", "jobLink", "companyName"],
		// resumeAttachedFlag
	},
	{
		title: "Std LinkedIN",
		templateText: `
    Hi $.userName,

    It's great connecting with you. How have you been?
    
    I found a job opportunity at $.companyName which perfectly overlaps with my skillset and wanted to check if you could provide me with a refferal for the same.
    
    Here is the job link:
    $.jobLink
    
    Here is a link to my resume: 
    #.resumeLink

    Looking forward to hearing back from you, thank you for your time and consideration.
    

    Best Regards,
    Tanush
    `,
		variables: ["userName", "jobLink", "companyName"],
		// resumeAttachedFlag
	},
	{
		title: "Std LinkedIN",
		templateText: `
    Hi $.userName,

    It's great connecting with you. How have you been?
    
    I found a job opportunity at $.companyName which perfectly overlaps with my skillset and wanted to check if you could provide me with a refferal for the same.
    
    Here is the job link:
    $.jobLink
    
    Here is a link to my resume: 
    #.resumeLink

    Looking forward to hearing back from you, thank you for your time and consideration.
    

    Best Regards,
    Tanush
    `,
		variables: ["userName", "jobLink", "companyName"],
		// resumeAttachedFlag
	},
];

export type ITextPart = {
	style: "normal" | "highlighted";
	text: string;
};

const TemplateCard = (props: {
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
			<div className="font-bold text-xl">{title}</div>
			<div className="flex justify-start  flex-wrap">
				{variables.map((variable) => (
					<span
						key={variable}
						className="rounded mb-2 mr-2 px-2.5 py-1 bg-purple-800"
					>
						{variable}
					</span>
				))}
			</div>
			{/* <div className="text-ellipsis text-gray-400 flex w-full h-10 overflow-clip text-wrap">
				{templateText}
			</div> */}
		</div>
	);
};
const TemplateList = (props: {
	templates: ITemplate[];
	selectedTemplateId: number | undefined;
	setSelectedTemplateID: (ip: number) => void;
}) => {
	return (
		<div className="flex flex-col w-full ">
			<div
				className={`${GeistSans.className} w-full flex justify-start items-center text-xl`}
			>
				Templates
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
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

export default function Home() {
	const resumeLinkFromStorage = localStorage.getItem("resumeLink");
	const [resumeInput, setResumeInput] = useState<string>("");
	const [resumeLink, setResumeLink] = useState<string>(
		resumeLinkFromStorage || ""
	);

	const [currentSelected, setCurrentSelected] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		if (resumeLinkFromStorage) {
			setResumeLink(resumeLinkFromStorage);
		}
	}, []);

	useEffect(() => {
		// Whenever ResumeLink Changes set the value in localStorage
		if (resumeLink) {
			localStorage.setItem("resumeLink", resumeLink);
		}
	}, [resumeLink]);

	const replaceResumeLinkInTemplate = (
		templateText: string,
		resumeLink: string
	) => {
		return templateText.replace("#.resumeLink", resumeLink);
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-7 text-gray-100">
			<ResumeSaveSection
				resumeLink={resumeLink}
				setResumeLink={setResumeLink}
				resumeInput={resumeInput}
				setResumeInput={setResumeInput}
			/>
			<TemplateList
				templates={templates}
				selectedTemplateId={currentSelected}
				setSelectedTemplateID={setCurrentSelected}
			/>
			{currentSelected !== undefined && (
				<div className="mt-3 flex justify-start w-full">
					<GenerateTemplate
						templateText={replaceResumeLinkInTemplate(
							templates[currentSelected].templateText,
							resumeLink
						)}
						title={templates[currentSelected].title}
						variables={templates[currentSelected].variables}
					/>
				</div>
			)}
			<Toaster />
		</main>
	);
}
