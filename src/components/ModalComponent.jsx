import React from 'react';
import { FaCopy, FaPaste } from 'react-icons/fa';

const ModalContent = ({ title, setTitle, copiedText, setCopiedText, handleCopyToClipboard, handlePasteFromClipboard }) => {
	return (
		<div>
			<input
				type="text"
				placeholder="Enter the title"
				className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full mb-4 mt-2"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<div className="flex justify-end mb-2">
				<button className="mr-2" onClick={handleCopyToClipboard}>
					<FaCopy title="Copy" />
				</button>
				<button onClick={handlePasteFromClipboard}>
					<FaPaste title="Paste" />
				</button>
			</div>
			<textarea
				className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full h-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
				placeholder="Enter the text"
				value={copiedText}
				onChange={(e) => setCopiedText(e.target.value)}
			/>
		</div>
	);
};

export default ModalContent;
