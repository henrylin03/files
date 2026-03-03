import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
	cloud_name: "dbdo3go6i",
	api_key: String(process.env.API_KEY),
	api_secret: String(process.env.API_SECRET),
});

export { cloudinary };
