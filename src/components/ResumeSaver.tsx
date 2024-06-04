"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type IResumeSaveSectionProps = {
	resumeLink: string;
	setResumeLink: (resumeLink: string) => void;
	resumeInput: string;
	setResumeInput: (resumeInput: string) => void;
};

export type IProfileFormData = {
	name: string;
	email: string;
	phone: string;
	resumeLink: string;
};
export type IProfileSignUpProps = {
	name: string;
	email: string;
	phone: string;
	resumeLink: string;
	saveProfile: (data: IProfileFormData) => void;
};
export const ProfileSignUp = (props: IProfileSignUpProps) => {
	const [name, setName] = useState(props.name);
	const [email, setEmail] = useState(props.email);
	const [phone, setPhone] = useState(props.phone);
	const [resumeLink, setResumeLink] = useState(props.resumeLink);

	useEffect(() => {
		setName(props.name);
		setEmail(props.email);
		setPhone(props.phone);
		setResumeLink(props.resumeLink);
	}, [props.name, props.email, props.phone, props.resumeLink]);
	return (
		<div className="flex flex-col w-full p-5 my-2 border-2 border-gray-300 rounded">
			{/* Form To Enter or Update Profile Section */}
			<div>Add Profile Details:</div>
			<div className="flex flex-col space-y-2">
				<form className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<div className="grid items-center justify-start grid-cols-3 p-2 mt-1 space-x-2 bg-gray-700 rounded ">
						<label>Name:</label>
						<input
							type="text"
							defaultValue={props.name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
							className="col-span-2 px-3 py-2 text-xs text-black rounded"
						/>
					</div>
					<div className="grid items-center justify-start grid-cols-3 p-2 mt-1 space-x-2 bg-gray-700 rounded ">
						<label>Email:</label>
						<input
							type="email"
							defaultValue={props.email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="col-span-2 px-3 py-2 text-xs text-black rounded"
						/>
					</div>
					<div className="grid items-center justify-start grid-cols-3 p-2 mt-1 space-x-2 bg-gray-700 rounded ">
						<label>Phone:</label>
						<input
							type="tel"
							defaultValue={props.phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="Phone"
							className="col-span-2 px-3 py-2 text-xs text-black rounded"
						/>
					</div>
					<div className="grid items-center justify-start grid-cols-3 p-2 mt-1 space-x-2 bg-gray-700 rounded ">
						<label>Resume Link:</label>
						<input
							type="url"
							defaultValue={props.resumeLink}
							onChange={(e) => setResumeLink(e.target.value)}
							placeholder="Resume Link"
							className="col-span-2 px-3 py-2 text-xs text-black rounded"
						/>
					</div>
				</form>
				<button
					onClick={() => {
						console.log("Data To Save: ");
						console.log({
							name: name,
							email: email,
							phone: phone,
							resumeLink: resumeLink,
						});
						props.saveProfile({
							name,
							email,
							phone,
							resumeLink,
						});
						toast("Profile Details Saved Successfully");
					}}
					className="flex items-center justify-center px-3 py-2 bg-green-700 rounded"
				>
					Save
				</button>
			</div>
		</div>
	);
};
const ResumeSaveSection = ({
	resumeLink,
	setResumeLink,
	resumeInput,
	setResumeInput,
}: IResumeSaveSectionProps) => {
	return (
		<div className="flex flex-col w-full p-5 my-2 border-2 border-gray-300 rounded">
			<div className="flex items-center justify-start w-full space-x-5 text-gray-300">
				<span className="flex items-center justify-center">
					{resumeLink ? "Current Link" : "No Link Found"}
				</span>
				{/* <div className="flex justify-start items-center space-x-2 w-[80%]">
				</div> */}
				{resumeLink && (
					<a
						href={resumeLink}
						className="px-3 py-2 text-blue-300 truncate rounded"
					>
						{resumeLink}
					</a>
				)}
				{/* <button className="flex px-3 py-2 bg-green-700 rounded">Save</button> */}
			</div>
			<div className="flex items-center justify-start w-full space-x-5 text-gray-300">
				<span>Resume Link</span>
				<input
					onChange={(e) => {
						setResumeInput(e.target.value);
					}}
					className="px-3 py-2 rounded text-black w-[70vw]"
				/>
				{/* <div className="grid items-center justify-start grid-cols-2 p-2 mt-1 space-x-2 bg-gray-700 rounded ">
					</div> */}
				<button
					onClick={() => {
						setResumeLink(resumeInput);
					}}
					className="flex px-3 py-2 bg-green-700 rounded"
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default ResumeSaveSection;
