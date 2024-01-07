import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCopy, FaPaste } from 'react-icons/fa';
import './Clip.css';

const ClipboardExample = () => {
	const [copiedText, setCopiedText] = useState('');
	const [title, setTitle] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="relative flex flex-col items-center justify-center h-screen">
			<button onClick={openModal}>Open Modal</button>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Clipboard Modal"
				style={{
					content: {
						width: '50%', // Set the width as desired
						height: '50vh', // Set the height as a percentage of the viewport height
						margin: 'auto', // Center the modal horizontally
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					},
				}}
			>
				<div>
					<input
						type="text"
						placeholder="Enter the title"
						className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full mb-10"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="flex justify-end mt-2">
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
			</Modal>
		</div>
	);
};

export default ClipboardExample;
