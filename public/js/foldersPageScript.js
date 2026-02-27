const getDeleteFolderPath = (folderId) => `/folders/${folderId}/delete`;
const getRenameFolderPath = (folderId) => `/folders/${folderId}/rename`;

const enableFolderDeletions = (modalId) => {
	const confirmDeleteFolderModal = document.querySelector(`#${modalId}`);
	const confirmDeleteFolderBtn =
		confirmDeleteFolderModal.querySelector(".delete-btn");

	const deleteFolderButtons = document.querySelectorAll(".delete-folder-btn");
	deleteFolderButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const folderIdForDeletion = e.currentTarget.dataset.folderId;
			confirmDeleteFolderBtn.dataset.folderId = folderIdForDeletion;
			confirmDeleteFolderModal.showModal();
		});
	});

	confirmDeleteFolderBtn.addEventListener("click", (e) => {
		const folderIdForDeletion = e.currentTarget.dataset.folderId;

		confirmDeleteFolderModal
			.querySelector("form")
			.setAttribute("action", getDeleteFolderPath(folderIdForDeletion));
	});

	confirmDeleteFolderModal
		.querySelector(".cancel-btn")
		.addEventListener("click", () => confirmDeleteFolderModal.close());
};

const enableFolderRenamings = (modalId) => {
	const renameModal = document.querySelector(`#${modalId}`);
	const saveBtn = renameModal.querySelector("button[type='submit']");
	const textField = renameModal.querySelector("#folder-name-input");

	const renameFolderBtns = document.querySelectorAll(".rename-folder-btn");
	renameFolderBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const { folderId: targetFolderId, folderName: currentFolderName } =
				e.currentTarget.dataset;

			textField.value = currentFolderName;
			renameModal.dataset.folderName = currentFolderName;
			renameModal.dataset.folderId = targetFolderId;

			textField.select();
			renameModal.showModal();
		});
	});

	renameModal.addEventListener("submit", (e) => {
		const { folderId, folderName: previousFolderName } =
			e.currentTarget.dataset;
		const inputtedNewFolderName = textField.value;

		if (inputtedNewFolderName.trim() === previousFolderName)
			return e.preventDefault();

		renameModal
			.querySelector("form")
			.setAttribute("action", getRenameFolderPath(folderId));
	});

	renameModal
		.querySelector(".cancel-btn")
		.addEventListener("click", () => renameModal.close());

	renameModal.addEventListener("close", (e) => {
		const currentFolderName = e.currentTarget.dataset.folderName;
		textField.value = currentFolderName;
	});
};

/* main */
enableFolderDeletions("confirm_folder_delete_modal");
enableFolderRenamings("rename_folder_modal");
