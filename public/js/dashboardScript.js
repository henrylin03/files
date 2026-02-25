const modal = document.querySelector("#confirm_folder_delete_modal");
const confirmDeleteButton = modal.querySelector(".delete-btn");

const getDeleteFolderPath = (folderId) => `/folders/${folderId}/delete`;

const deleteFolderButtons = document.querySelectorAll(".delete-folder-btn");
deleteFolderButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const folderIdForDeletion = e.currentTarget.dataset.folderId;
		confirmDeleteButton.dataset.folderId = folderIdForDeletion;
		modal.showModal();
	});
});

confirmDeleteButton.addEventListener("click", (e) => {
	const folderIdForDeletion = e.currentTarget.dataset.folderId;

	modal
		.querySelector("form")
		.setAttribute("action", getDeleteFolderPath(folderIdForDeletion));
});

modal
	.querySelector(".cancel-btn")
	.addEventListener("click", () => modal.close());
