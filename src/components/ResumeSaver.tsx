"use client";
type IResumeSaveSectionProps = {
	resumeLink: string;
	setResumeLink: (resumeLink: string) => void;
	resumeInput: string;
	setResumeInput: (resumeInput: string) => void;
};
const ResumeSaveSection = ({
	resumeLink,
	setResumeLink,
	resumeInput,
	setResumeInput,
}: IResumeSaveSectionProps) => {
	return (
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
	);
};

export default ResumeSaveSection;
