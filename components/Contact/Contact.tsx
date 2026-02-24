"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map/Map"), {
  ssr: false,
});
import styles from "./Contact.module.css";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

const Contact = () => {

  const [values, setValues] = useState({
    firstName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState<Record<string,string>>({});

  const validateField = (name: string, value: string) => {
  let error = "";

  if (name === "firstName") {
    if (!value.trim()) {
      error = "First Name is required";
    } else if (value.startsWith(" ")) {
      error = "Name should not start with space";
    } else if (value.trim().length < 3) {
      error = "Name must be at least 3 characters";
    }
  }

  if (name === "email") {
    if (!value.trim()) {
      error = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email format";
    }
  }

  if (name === "phone") {
    if (!value.trim()) {
      error = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(value)) {
      error = "Enter valid 10 digit phone number";
    }
  }

  if (name === "subject") {
    if (!value.trim()) {
      error = "subject is required";
    }else if (value.startsWith(" ")) {
      error = "subject should not start with space";
    } else if (value.trim().length < 3) {
      error = "subject must be at least 3 characters";
    }
  }

  if (name === "message") {
    if (!value.trim()) {
      error = "Message is required";
    } else if (value.trim().length < 10) {
      error = "Message must be at least 10 characters";
    }
  }

  return error;
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setValues({ ...values, [name]: value });

  const error = validateField(name, value);
  setError(prev =>({...prev, [name]: error}) );
};

const handleClick = () => {
  let newErrors: any = {};

  Object.keys(values).forEach((key) => {
    const error = validateField(key, values[key as keyof typeof values]);
    if (error) {
      newErrors[key] = error;
    }
  });

  setError(newErrors);


};
  return (
    <section className={styles.contact}>
      {/* header for contact */}
      <div className={styles.contactHead}>
        <div className={styles.headList}>
          <a href="" className={styles.home}>Home</a><ChevronRight size={16} />
          <span className={styles.pages}>Pages</span><ChevronRight size={16} />
          <span className={styles.contactUs}>Contact Us</span>
        </div>
      </div>
      {/* banner for contact */}
      <div className={styles.contactBanner}>
        <div className={styles.text}>
          <h4 className={styles.get}>Get in touch</h4>
          <h1 className={styles.titleone}>Let's Talk About</h1>
          <h1 className={styles.titletwo}>Your Idea</h1>
          <p className={styles.para}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam eius placeat, a quidem mollitia at accusantium reprehenderit pariatur provident nam ratione incidunt magnam sequi</p>
          <div className={styles.btnGroup}>
            <a href="#" className={styles.btnone}>About Us</a>
            <a href="#" className={styles.btntwo}>Support Center</a>
          </div>
        </div>
      </div>
      {/* map section in contact */}
      <div className={styles.map}>
        <div className={styles.mapbox}>
          <Map />
          <div className={styles.mapcontantbox}>
            <div className={styles.mapcontant}>
              <h4 className={styles.maptitle}>Office</h4>
              <p className={styles.mappara}>205 North Michigan Avenue, Suite 810</p>
              <p className={styles.mappara}>Chicago, 60601, USA</p>
              <p className={styles.mappara}>
                <abbr title="Phone">Phone:</abbr>
                <a href="tel:1234567890">(123) 456-7890</a>
              </p>
              <p className={styles.mappara}>
                <abbr title="Email">Email:</abbr>
                <a href="mailto:contact@evara.com">contact@evara.com</a>
              </p>
              <a href="" className={styles.mapbtn}><MapPin size={14} className={styles.mapicon} />View map</a>
            </div>
            <div className={styles.mapcontant}>
              <h4 className={styles.maptitle}>Studio</h4>
              <p className={styles.mappara}>205 North Michigan Avenue, Suite 810</p>
              <p className={styles.mappara}>Chicago, 60601, USA</p>
              <p className={styles.mappara}>
                <abbr title="Phone">Phone:</abbr>
                <a href="tel:1234567890">(123) 456-7890</a>
              </p>
              <p className={styles.mappara}>
                <abbr title="Email">Email:</abbr>
                <a href="mailto:contact@evara.com">contact@evara.com</a>
              </p>
              <a href="" className={styles.mapbtn}><MapPin size={14} className={styles.mapicon} />View map</a>
            </div>
            <div className={styles.mapcontant}>
              <h4 className={styles.maptitle}>Shop</h4>
              <p className={styles.mappara}>205 North Michigan Avenue, Suite 810</p>
              <p className={styles.mappara}>Chicago, 60601, USA</p>
              <p className={styles.mappara}>
                <abbr title="Phone">Phone:</abbr>
                <a href="tel:1234567890">(123) 456-7890</a>
              </p>
              <p className={styles.mappara}>
                <abbr title="Email">Email:</abbr>
                <a href="mailto:contact@evara.com">contact@evara.com</a>
              </p>
              <a href="" className={styles.mapbtn}><MapPin size={14} className={styles.mapicon} />View map</a>
            </div>
          </div>
        </div>
      </div>
      {/* contact form */}
      <div className={styles.formbox}>
        <h1 className={styles.formtitle}>Drop Us a Line</h1>
        <p className={styles.formpara}>
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form className={styles.formfield}>
          <div className={styles.contactform}>

            <div className={styles.inputs}>

              <div className={styles.inputGroup}>
                <input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={error.firstName ? styles.errorInput : ""}
                />
                {error.firstName && (
                  <p className={styles.error}>{error.firstName}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={error.email ? styles.errorInput : ""}
                />
                {error.email && (
                  <p className={styles.error}>{error.email}</p>
                )}
              </div>

            </div>
            <div className={styles.inputs}>
              <div className={styles.inputGroup}>
                <input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className={error.phone ? styles.errorInput : ""}
                />
                {error.phone && <p className={styles.error}>{error.phone}</p>}

              </div>

              <div className={styles.inputGroup}>
                <input
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={error.subject ? styles.errorInput : ""}
                />
                {error.subject && <p className={styles.error}>{error.subject}</p>}
              </div>

            </div>

            <div className={styles.textareaBox}>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Message"
                className={error.message ? styles.errorInput : ""}
              />
              {error.message && <p className={styles.error}>{error.message}</p>}
            </div>

            <button
              type="button"
              onClick={handleClick}
              className={styles.btn}
            >
              Send message
            </button>

          </div>
        </form>
      </div>

    </section>
  )
}

export default Contact;