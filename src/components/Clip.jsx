import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCopy, FaEdit, FaEye, FaPaste, FaPlus, FaTrash } from 'react-icons/fa';
import './Clip.css';
const ClipboardExample = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [copiedText, setCopiedText] = useState('');
	const [isEyeIconClicked, setIsEyeIconClicked] = useState(false);

	const openModal = () => setIsModalOpen(true);

	const closeModal = () => {
		setIsModalOpen(false);
		setIsEyeIconClicked(false);
	};

	const handleTitleClick = () => {
		setIsEyeIconClicked(true);
		openModal();
	};

	const handleEditModal = () => {
		setIsEyeIconClicked(false);
		openModal();
	}

	const openNewModal = () => {
		setTitle('');
		setCopiedText('');
		setIsModalOpen(true);
	};
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
			{/* Display the entered title outside the modal */}
			{title && (
				<div className="mt-4 flex items-center"  style={{ cursor: 'pointer' }}>
					<span className="mr-2">Entered Title: {title}</span>
					<button onClick={handleEditModal}>	<FaEdit /></button>
					<button onClick={handleTitleClick}>	<FaEye className="ml-2" /></button>
				</div>
			)}
			<button className='mt-5' onClick={openNewModal}><FaPlus /></button>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Clipboard Modal"
				style={{
					content: {
						width: '45%',
						height: '45vh',
						margin: 'auto',
						display: 'flex',
						flexDirection: 'column',
						border: '1px solid',
						borderRadius: '15px',
					},
				}}
			>
				<div>
					<input
						type="text"
						placeholder="Enter the title"
						className="bg-slate-200 text-black font-semibold border border-gray-500 rounded-lg p-2 w-full mb-4 mt-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="flex justify-end mb-2">
						{isEyeIconClicked ? (
							<button className="mr-2" onClick={handleCopyToClipboard}>
								<FaCopy title="Copy" />
							</button>
						) : (
							<button onClick={handlePasteFromClipboard}>
								<FaPaste title="Paste" />
							</button>
						)}
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