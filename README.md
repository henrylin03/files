<!-- PROJECT SHIELDS -->

[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">Organizized</h1>

  <p align="center">
    "One of these days, I'm gonna get organizized!"
    <br />
    <br />
    <a href="https://odin-file-uploader-3h6q.onrender.com/" target="_blank">Live app</a> · 
    <a href="https://github.com/henrylin03/organizized/issues/new" target="_blank">Add issue</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About

Full-stack web app, with authentication (`passportjs`), where users can sign up and upload files.

Built in Express.js (Node.js), with Prisma ORM, and ETA templating. `passport.js` abstracts away a lot of the auth logic. Files are stored in Cloudinary.

This project is part of [The Odin Project's](https://www.theodinproject.com/) "Full Stack JavaScript" course.

### Built with

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#) [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#) [![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](<[#](https://tailwindcss.com/)>)

## Local development

**NOTE:** to ensure you can connect to a local version of this db, ensure you have a `.env` file with the DB connection string like so:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:<port>/<db_name>?schema=public"
```

<!-- MARKDOWN LINKS & IMAGES -->

[issues-shield]: https://img.shields.io/github/issues/henrylin03/organizized.svg?style=for-the-badge
[issues-url]: https://github.com/henrylin03/organizized/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/henrylin03/
