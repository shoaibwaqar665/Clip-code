import React, { useState } from 'react';
import { FaCopy, FaPaste } from 'react-icons/fa';
import './Clip.css'
const ClipboardExample = () => {
	const [copiedText, setCopiedText] = useState('');

	const handleCopyToClipboard = async () => {
		try {
			// Copy text to clipboard
			await navigator.clipboard.writeText(copiedText);
			console.log('Text copied to clipboard:', copiedText);
		} catch (error) {
			console.error('Unable to copy text to clipboard:', error);
		}
	};

	const handlePasteFromClipboard = async () => {
		try {
			// Read text from clipboard
			const text = await navigator.clipboard.readText();
			console.log('Text read from clipboard:', text);
			// Set the copied text in your state or perform any other actions
			setCopiedText(text);
		} catch (error) {
			console.error('Unable to read text from clipboard:', error);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<textarea
				className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-2/4 h-2/4 mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 "
				value={copiedText}
				onChange={(e) => setCopiedText(e.target.value)}
			/>
			<div className="flex flex-col items-center">
				<button
					onClick={handleCopyToClipboard}
				>
					<FaCopy />
				</button>
				<button
					onClick={handlePasteFromClipboard}
				>
					<FaPaste />
				</button>
			</div>
		</div>
	);


};

export default ClipboardExample;
