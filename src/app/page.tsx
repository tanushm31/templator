"use client";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { useEffect, useRef, useState } from "react";
import GenerateTemplate from "@/components/GenerateTemplate";
import ResumeSaveSection from "@/components/ResumeSaver";
import { TemplateList } from "@/components/Template";

export type ITemplate = {
	title: string;
	templateText: string;
	variables: string[];
	// resumeAttachedFlag: "resumelink" | "attached" | "none";
};

export type ITextPart = {
	style: "normal" | "highlighted";
	text: string;
};

export default function Home() {
	const templates: ITemplate[] = [
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
	// const resumeLinkFromStorage = "";
	const [resumeInput, setResumeInput] = useState<string>("");
	const [resumeLink, setResumeLink] = useState<string>("");

	const [currentSelected, setCurrentSelected] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		if (typeof window === "undefined") return;
		// Whenever the component mounts, get the resumeLink from localStorage
		const resumeLinkFromStorage = localStorage.getItem("resumeLink");
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
