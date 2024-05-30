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
		{
			templateText: `
      Hi $.userName,

      It's great connecting with you. Hope you're doing well.

      I know you must get an insane volume of applicants so I wanted to take this opportunity to focus on 5 Bullet points that would help you get a better idea of me as a person and why I want to join $.companyName's journey.

      - I'm deeply passionate about the dynamic world of Web, JavaScript and the ever-evolving React and Web Ecosystem, constantly immersing myself in the latest technologies. I've had the privilege of spearheading frontend migrations to Next.js, React (Typescript), and TailwindCSS, crafting seamless user experiences for more than 2-3 years now in my current role at Optum.

      - At Optum, I've been thrown into multiple hats, ranging from Web-Development (Frontend/Backend), AI/ML projects, NLP etc. This flexibility mirrors the startup ethos, where versatility is key.

      - With each project, I take ownership as if it were my own, pouring my energy into delivering exceptional & creative results that push boundaries.

      - I'm accustomed to working in fast paced environments with high developer velocity.

      Thank you for considering my application. I am looking forward to the possibility of joining $.companyName's journey. I am available for an interview at your earliest convenience and can be reached at +91-7988187982 or via email at taush.mohina@gmail.com.

      Here is a link to my resume:
      #.resumeLink

      Best Regards 
      Tanush Mahajan
      `,
			title: "Linked IN Recruiters",
			variables: ["userName", "companyName"],
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
