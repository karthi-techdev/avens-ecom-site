"use client";

import dynamic from "next/dynamic";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

const Map = dynamic(() => import("../Map/Map"), {
  ssr: false,
});

const Contact = () => {
  const [values, setValues] = useState({
    firstName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "firstName") {
      if (!value.trim()) error = "First Name is required";
      else if (value.startsWith(" "))
        error = "Name should not start with space";
      else if (value.trim().length < 3)
        error = "Name must be at least 3 characters";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(value))
        error = "Invalid email format";
    }

    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(value))
        error = "Enter valid 10 digit phone number";
    }

    if (name === "subject") {
      if (!value.trim()) error = "subject is required";
      else if (value.startsWith(" "))
        error = "subject should not start with space";
      else if (value.trim().length < 3)
        error = "subject must be at least 3 characters";
    }

    if (name === "message") {
      if (!value.trim()) error = "Message is required";
      else if (value.trim().length < 10)
        error = "Message must be at least 10 characters";
    }

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    const err = validateField(name, value);
    setError((prev) => ({ ...prev, [name]: err }));
  };

  const handleClick = () => {
    let newErrors: any = {};

    Object.keys(values).forEach((key) => {
      const err = validateField(key, values[key as keyof typeof values]);
      if (err) newErrors[key] = err;
    });

    setError(newErrors);
  };

  return (
    <section className="w-full bg-[var(--white)] border-b border-[var(--border-color)] font-[Quicksand]">
      {/* header */}
      <div className="bg-[var(--bg-light)]  text-[var(--text-muted)] font-medium !px-5 !py-4">
        <div className="flex items-center gap-2 justify-start md:justify-start  text-md capitalize sm:!pl-1 md:!pl-12 lg:!pl-12">
          <a href="#" className="!text-[var(--blog-text)]">
            Home
          </a>
          <ChevronRight size={16} />
          <span className="!pl-2">Pages</span>
          <ChevronRight size={16} />
          <span className="!pl-2">Contact Us</span>
        </div>
      </div>

      {/* banner */}
      <div className="!py-16 md:!py-24 min-h-[480px] md:min-h-[580px] bg-[var(--contact-bg)] text-center !px-4">
        <h4 className="!mb-4 text-[var(--blog-text)] text-lg md:text-xl font-bold">
          Get in touch
        </h4>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
          Let's Talk About
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black !mb-5 leading-tight">
          Your Idea
        </h1>

        <p className="!mx-auto w-[90%] sm:w-[80%] md:w-1/2 text-sm font-semibold text-[var(--text-muted)] !mb-10 md:!mb-12 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam eius placeat, a quidem mollitia at accusantium reprehenderit pariatur provident nam ratione incidunt magnam sequi.
        </p>

        <div className="flex justify-center flex-wrap gap-4 md:gap-5">
          <a className="text-sm font-bold !px-6 md:!px-8 !py-3 rounded border !border-[var(--contact-border)] bg-[var(--blog-text)] !text-[var(--white)] hover:-translate-y-1 hover:shadow-lg transition">
            About Us
          </a>
          <a className="text-sm font-bold !px-6 md:!px-8 !py-3 rounded border !border-[var(--contact-border)] hover:-translate-y-1 hover:shadow-lg transition">
            Support Center
          </a>
        </div>
      </div>

      {/* map */}
      <div className="!py-10 md:!py-12 border-y border-[var(--border-color)] ">
        <div className="w-[92%] md:w-[87%] !mx-auto !pt-6 md:!pt-8">
          <Map />

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 !mt-8  ">
            {["Office", "Studio", "Shop"].map((item) => (
              <div key={item} className="flex-1 text-left !pl-[50px] md:!pl-[100px] lg:pl-[100px]">
                <h4 className="!mb-3 md:!b-4 text-[var(--blog-text)] text-lg font-extrabold">
                  {item}
                </h4>

                <p className="text-sm leading-7">
                  205 North Michigan Avenue, Suite 810
                </p>
                <p className="text-sm leading-7">
                  Chicago, 60601, USA
                </p>

                <p className="text-sm leading-7">
                  <abbr title="Phone">Phone:</abbr>{" "}
                  <a href="tel:1234567890">(123) 456-7890</a>
                </p>

                <p className="text-sm leading-7">
                  <abbr title="Email">Email:</abbr>{" "}
                  <a href="mailto:contact@evara.com">
                    contact@evara.com
                  </a>
                </p>

                <a className="inline-flex items-center gap-2 text-sm font-bold !px-6 md:!px-8 !py-3 rounded border !border-[var(--contact-border)] !bg-[var(--bg-light)] !text-[var(--blog-text)] !mt-4 md:!mt-5 hover:-translate-y-1 hover:shadow-lg transition">
                  <MapPin size={14} />
                  View map
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* form */}
      <div className=" !py-12 md:!py-14 !px-4 text-center">
        <h1 className="text-xl md:text-2xl font-semibold !mb-2">
          Drop Us a Line
        </h1>
        <p className="text-[var(--text-muted)] !mb-6 text-sm">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form className="flex justify-center">
          <div className="w-full max-w-[700px]">
            {/* row 1 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {["firstName", "email"].map((field) => (
                <div key={field} className="w-full !mt-4 md:!mt-5 text-left">
                  <input
                    name={field}
                    value={values[field as keyof typeof values]}
                    onChange={handleChange}
                    placeholder={
                      field === "firstName"
                        ? "First Name"
                        : "Your Email"
                    }
                    className={`w-full !p-3 border border-[var(--border-color)] rounded outline-none text-sm focus:border-[var(--blog-text)] ${
                      error[field] ? "border-red-500" : ""
                    }`}
                  />
                  {error[field] && (
                    <p className="text-red-500 text-xs !mt-1">
                      {error[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* row 2 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-5">
              {["phone", "subject"].map((field) => (
                <div key={field} className="w-full !mt-4 md:!mt-5 text-left">
                  <input
                    name={field}
                    value={values[field as keyof typeof values]}
                    onChange={handleChange}
                    placeholder={
                      field === "phone"
                        ? "Your Phone"
                        : "Subject"
                    }
                    className={`w-full !p-3 border border-[var(--border-color)] rounded outline-none text-sm focus:border-[var(--blog-text)] ${
                      error[field] ? "border-red-500" : ""
                    }`}
                  />
                  {error[field] && (
                    <p className="text-red-500 text-xs !mt-1">
                      {error[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* textarea */}
            <div className="!mt-4 md:!mt-5 mb-6 text-left">
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Message"
                className={`w-full h-[150px] !p-4 border border-[var(--border-color)] rounded resize-none outline-none text-sm focus:border-[var(--blog-text)] ${
                  error.message ? "border-red-500" : ""
                }`}
              />
              {error.message && (
                <p className="text-red-500 text-xs !mt-1">
                  {error.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleClick}
              className="w-full !mt-3 sm:w-auto bg-[var(--blog-text)] text-[var(--white)] !px-8 !py-3 border outline-none rounded text-sm hover:-translate-y-1 hover:shadow-lg transition"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );

};

export default Contact;