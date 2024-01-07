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
		<div className="relative flex flex-col items-center justify-center h-screen">
			<div className="relative w-2/4 h-2/4 mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
				<textarea
					className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full h-full"
					value={copiedText}
					onChange={(e) => setCopiedText(e.target.value)}
				/>
				<div className="absolute top-0 right-0 mt-2 mr-2 flex flex-col items-center space-y-2">
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
						onClick={handleCopyToClipboard}
					>
						<FaCopy />
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
						onClick={handlePasteFromClipboard}
					>
						<FaPaste />
					</button>
				</div>
			</div>
		</div>
	);


};

export default ClipboardExample;
