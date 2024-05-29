"use client";

import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { useEffect, useRef, useState } from "react";
import GenerateTemplate from "@/components/GenerateTemplate";

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
];

export type ITextPart = {
	style: "normal" | "highlighted";
	text: string;
};

export default function Home() {
	const resumeLinkFromStorage = localStorage.getItem("resumeLink");
	const [resumeInput, setResumeInput] = useState<string>("");
	const [resumeLink, setResumeLink] = useState<string>(
		resumeLinkFromStorage || ""
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
			<div
				className={`${GeistSans.className} w-full flex justify-start items-center text-xl`}
			>
				Templates
			</div>
			<div className="p-5 border-gray-300 border-2 rounded flex w-full flex-col my-2">
				<div className="flex w-full justify-start space-x-5 items-center text-gray-300">
					<span className="flex justify-center items-center">
						{resumeLink ? "Current Link" : "No Link Found"}
					</span>
					{/* <div className="flex justify-start items-center space-x-2 w-[80%]">
				</div> */}
					{resumeLink && (
						<a
							href={resumeLink}
							className="px-3 py-2 rounded text-blue-300 truncate"
						>
							{resumeLink}
						</a>
					)}
					{/* <button className="flex px-3 py-2 rounded bg-green-700">Save</button> */}
				</div>
				<div className="flex w-full space-x-5 justify-start items-center text-gray-300">
					<span>Resume Link</span>
					<input
						onChange={(e) => {
							setResumeInput(e.target.value);
						}}
						className="px-3 py-2 rounded text-black w-[70vw]"
					/>
					{/* <div className="flex justify-start items-center space-x-2">
					</div> */}
					<button
						onClick={() => {
							setResumeLink(resumeInput);
						}}
						className="flex px-3 py-2 rounded bg-green-700"
					>
						Save
					</button>
				</div>
			</div>
			<div className="mt-3 flex justify-start w-full">
				<GenerateTemplate
					templateText={replaceResumeLinkInTemplate(
						templates[0].templateText,
						resumeLink
					)}
					title={templates[0].title}
					variables={templates[0].variables}
				/>
			</div>
		</main>
	);
}
