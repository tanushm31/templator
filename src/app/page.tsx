"use client";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { useEffect, useRef, useState } from "react";
import GenerateTemplate from "@/components/GenerateTemplate";
import ResumeSaveSection, {
	IProfileFormData,
	ProfileSignUp,
} from "@/components/ResumeSaver";
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
      #.profileName
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

      Thank you for considering my application. I am looking forward to the possibility of joining $.companyName's journey. I am available for an interview at your earliest convenience and can be reached at #.profilePhone or via email at #.profileEmail.

      Here is a link to my resume:
      #.resumeLink

      Best Regards 
      #.profileName
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

	const [profile, setProfile] = useState<IProfileFormData>({
		name: "",
		email: "",
		phone: "",
		resumeLink: "",
	});

	const someValuePresent = (profile: IProfileFormData) => {
		return (
			profile.name !== "" ||
			profile.email !== "" ||
			profile.phone !== "" ||
			profile.resumeLink !== ""
		);
	};

	const allValuesPresent = (profile: IProfileFormData) => {
		return (
			profile.name !== "" &&
			profile.email !== "" &&
			profile.phone !== "" &&
			profile.resumeLink !== ""
		);
	};

	// use effect to load profileData From Local Storage
	useEffect(() => {
		if (typeof window === "undefined") return;
		// Whenever the component mounts, get the resumeLink from localStorage
		const profileDataFromStorage = localStorage.getItem("profileData");
		if (profileDataFromStorage) {
			setProfile(JSON.parse(profileDataFromStorage));
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		// Whenever the component mounts, get the resumeLink from localStorage
		const resumeLinkFromStorage = localStorage.getItem("resumeLink");
		if (resumeLinkFromStorage) {
			setResumeLink(resumeLinkFromStorage);
		}
	}, []);

	// use effect to save profileData to Local Storage
	useEffect(() => {
		// Whenever Profile Changes set the value in localStorage
		if (profile && someValuePresent(profile)) {
			console.log("Updating Profile Data in Local Storage");
			localStorage.setItem("profileData", JSON.stringify(profile));
		}
	}, [profile]);

	const pageLoaded = useState(false);

	const [showHideProfileEditor, setShowHideProfileEditor] = useState(false);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		if (someValuePresent(profile)) {
	// 			setShowHideProfileEditor(false);
	// 		} else {
	// 			setShowHideProfileEditor(true);
	// 		}
	// 	}, 1000);
	// }, [profile]);

	useEffect(() => {
		// Whenever ResumeLink Changes set the value in localStorage
		if (resumeLink) {
			localStorage.setItem("resumeLink", resumeLink);
		}
	}, [resumeLink]);

	const replaceProfileDataInTemplate = (
		templateText: string,
		profileData: IProfileFormData
	) => {
		return templateText
			.replace("#.profileName", profileData.name)
			.replace("#.profileEmail", profileData.email)
			.replace("#.profilePhone", profileData.phone)
			.replace("#.resumeLink", profileData.resumeLink);
	};

	return (
		<main className="flex flex-col items-center justify-start min-h-screen text-gray-100 p-7">
			<div className="flex items-center justify-between w-full text-3xl">
				Templator
				<button
					onClick={() => setShowHideProfileEditor(!showHideProfileEditor)}
					className={`px-3 py-2 rounded text-sm ${
						allValuesPresent(profile)
							? "bg-green-500"
							: someValuePresent(profile)
							? "bg-yellow-500"
							: "bg-red-500"
					}`}
				>
					Edit Profile
				</button>
			</div>
			{showHideProfileEditor && (
			<ProfileSignUp
				name={profile.name}
				email={profile.email}
				phone={profile.phone}
				resumeLink={profile.resumeLink}
				saveProfile={setProfile}
			/>
			)}
			{/* <div className="flex flex-col">
				<div>profile data</div>
				<div className="">Name: {profile.name ? profile.name : "Empty"}</div>
				<div className="">Email: {profile.email ? profile.email : "Empty"}</div>
				<div className="">Phone: {profile.phone ? profile.phone : "Empty"}</div>
				<div className="">
					Resume Link: {profile.resumeLink ? profile.resumeLink : "Empty"}
				</div>
			</div>
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
				<div className="flex justify-start w-full mt-3">
					<GenerateTemplate
						templateText={replaceProfileDataInTemplate(
							templates[currentSelected].templateText,
							profile
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
