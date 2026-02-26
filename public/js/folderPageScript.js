const modal = document.querySelector("#confirm_file_delete_modal");
const confirmDeleteButton = modal.querySelector(".delete-btn");

const getDeleteFilePath = (fileId) => `/files/${fileId}/delete`;

const deleteFileBtns = document.querySelectorAll(".delete-file-btn");
deleteFileBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const fileId = e.currentTarget.dataset.fileId;
		confirmDeleteButton.dataset.fileId = fileId;
		modal.showModal();
	});
});

confirmDeleteButton.addEventListener("click", (e) => {
	const idOfFileForDeletion = e.currentTarget.dataset.fileId;

	modal
		.querySelector("form")
		.setAttribute("action", getDeleteFilePath(idOfFileForDeletion));
});

modal
	.querySelector(".cancel-btn")
	.addEventListener("click", () => modal.close());
