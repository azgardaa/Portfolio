import React, { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Form() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    formData.append("access_key", "a1462f8a-c3e0-4027-8545-8a0a82fe3bdf");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      setIsSubmitted(true);
    }
  }

  function resetForm() {
    setIsSubmitted(false);
    setEmail("");
    setEmailError("");
    setFormValues({
      name: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="w-4/5 mx-auto  bg-primary text-white rounded-lg ">
      {isSubmitted ? (
        <div className=" p-8 rounded-lg  text-center shadow-[0px_0px_96px_100px_rgba(48,_107,_58,_0.35)]">
          <h1 className="text-2xl font-bold mb-4 text-green-600">Succès !</h1>
          <p className="mb-4">Votre demande a été soumise avec succès.</p>
          <button
            onClick={resetForm}
            className="py-2 px-4 bg-gray-800 text-white rounded-md border-2 border-gray-800 hover:bg-gray-700 transition-all my-3"
          >
            Soumettre une autre demande
          </button>
        </div>
      ) : (
        <form className="space-y-4 m-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <div className="md:w-1/2 px-3">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nom Prenom<span className="text-red-600">&#42;</span>
              </label>
              <input
                className="w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom et prenom"
                required
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email<span className="text-red-600">&#42;</span>
              </label>
              <input
                className="w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailRegex.test(e.target.value)) {
                    setEmailError("");
                  }
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-2">{emailError}</p>
              )}
            </div>
          </div>
          <div className="mb-4 px-3">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Sujet<span className="text-red-600">&#42;</span>
            </label>
            <input
              className="w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="subject"
              name="subject"
              type="text"
              placeholder="Sujet du message"
              required
              value={formValues.subject}
              onChange={(e) =>
                setFormValues({ ...formValues, subject: e.target.value })
              }
            />
          </div>
          <div className="mb-4 px-3">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message<span className="text-red-600">&#42;</span>
            </label>
            <textarea
              className="w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Votre message, soyez clair et concis dans votre demande"
              rows="4"
              required
              value={formValues.message}
              onChange={(e) =>
                setFormValues({ ...formValues, message: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex items-center justify-center md:justify-end py-4 px-8">
            <button className="py-2 px-4 md:py-4 md:px-6 bg-gray-800 rounded-md border-2 border-white flex items-center gap-2 hover:scale-95 transition-all">
              <span className="text-xl">Envoyer</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-telegram"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#fff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
