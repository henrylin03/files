import { prisma } from "./lib/prisma.js";

async function main() {
	const user = await prisma.user.create({
		data: {
			username: "john.smith@gmail.com",
			firstName: "John",
			lastName: "Smith",
			password: "PlaceholderPassword",
			isVerified: true,
		},
	});

	console.log("Created user:", user);

	// Fetch all users with their posts
	const allUsers = await prisma.user.findMany({
		include: {
			files: true,
			folders: true,
		},
	});
	console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
