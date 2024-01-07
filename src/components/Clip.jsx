import React, { useState } from 'react';
import { FaCopy, FaPaste } from 'react-icons/fa';
import './Clip.css';

const ClipboardExample = () => {
	const [copiedText, setCopiedText] = useState('');
	const [title, setTitle] = useState('');

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
			<div className="relative w-1/2 h-1/2 mb-2">
				<div className="absolute top-0 right-0 mt-2 mr-2 flex items-center">
					<button className="mr-2" onClick={handleCopyToClipboard}>
						<FaCopy />
					</button>
					<button onClick={handlePasteFromClipboard}>
						<FaPaste />
					</button>
				</div>
				<input
					type="text"
					placeholder="Enter the title"
					className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full mb-2"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full h-full mt-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
					placeholder="Enter the text"
					value={copiedText}
					onChange={(e) => setCopiedText(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default ClipboardExample;
