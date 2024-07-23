import React from "react";

export default function Link() {
  return (
    <div class="flex justify-center  items-center gap-4 w-full my-8">
      <a
        title="linkedin"
        href="https://www.linkedin.com/in/noah-cornu-926035172/"
      >
        <img
          class="h-12 w-12 invert"
          src="https://www.svgrepo.com/show/520815/linkedin.svg"
        />
      </a>
      <a title="instagram" href="https://www.instagram.com/noah_cornu/">
        <img
          class="h-8 w-8 mr-2 invert"
          src="https://www.svgrepo.com/show/521711/instagram.svg"
        />
      </a>
      <a title="github" href="https://github.com/azgardaa">
        <img
          class="h-8 w-8 invert"
          src="https://www.svgrepo.com/show/512317/github-142.svg"
        />
      </a>
    </div>
  );
}
