import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalContent from './ModalComponent';
import TitleDisplay from './ClipBoardDisplay';
import { FaCopy, FaPaste } from 'react-icons/fa';
import './Clip.css';

const ClipboardExample = () => {
	const [copiedText, setCopiedText] = useState('');
	const [title, setTitle] = useState('');
	const [enteredTitle, setEnteredTitle] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [titleClicked, setTitleClicked] = useState(false);

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

	const closeModal = () => {
		setIsModalOpen(false);
		// Update entered title when the modal is closed
		setEnteredTitle(title);
		// Reset titleClicked state
		setTitleClicked(false);
	};

	const handleTitleClick = () => {
		// If entered title is clicked, open the current modal; otherwise, open a new modal
		setTitleClicked(true);
		openModal();
	};

	const openNewModal = () => {
		// Reset modal state for a new modal
		setTitle('');
		setCopiedText('');
		setIsModalOpen(true);
	};

	return (
		<div className="relative flex flex-col items-center justify-center h-screen">
			{/* Display the entered title outside the modal */}
			{enteredTitle && <TitleDisplay enteredTitle={enteredTitle} handleTitleClick={handleTitleClick} />}
			<button onClick={openNewModal}>Open New Modal</button>
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
				<ModalContent
					title={title}
					setTitle={setTitle}
					copiedText={copiedText}
					setCopiedText={setCopiedText}
					handleCopyToClipboard={handleCopyToClipboard}
					handlePasteFromClipboard={handlePasteFromClipboard}
				/>
			</Modal>
		</div>
	);
};

export default ClipboardExample;
