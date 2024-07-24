import React from "react";

export default function Link() {
  return (
    <div className="flex justify-center items-center gap-4 w-full my-8">
      <a
        title="linkedin"
        href="https://www.linkedin.com/in/noah-cornu-926035172/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-12 w-12 invert"
          src="https://www.svgrepo.com/show/520815/linkedin.svg"
          alt="LinkedIn"
        />
      </a>
      <a
        title="instagram"
        href="https://www.instagram.com/noah_cornu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-8 w-8 mr-2 invert"
          src="https://www.svgrepo.com/show/521711/instagram.svg"
          alt="Instagram"
        />
      </a>
      <a
        title="github"
        href="https://github.com/azgardaa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-8 w-8 invert"
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="GitHub"
        />
      </a>
    </div>
  );
}
