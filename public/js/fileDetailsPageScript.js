const formatUploadDatetime = () => {
	const uploadDatetimeContainer = document.querySelector(
		"table .upload-date-time",
	);

	const uploadDatetime = new Date(uploadDatetimeContainer.textContent);

	const formatted = new Intl.DateTimeFormat("en-AU", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		timeZone: "Australia/Sydney",
		timeZoneName: "short",
	}).format(uploadDatetime);

	uploadDatetimeContainer.textContent = formatted;
};

formatUploadDatetime();
