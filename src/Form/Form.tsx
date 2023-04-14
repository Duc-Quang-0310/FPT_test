import { useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import { Country } from "../constant";

type FieldErr = "email" | "contactNumber" | "name";

interface ErrField {
  name?: string;
  contactNumber?: string;
  email?: string;
}

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexNumber = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const Form = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState<ErrField | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleBlur = (value: string, field: FieldErr) => {
    if (!value) {
      switch (field) {
        case "name":
          return setErrors((prev) => ({ ...prev, name: "Please enter Name" }));
        case "contactNumber":
          return setErrors((prev) => ({
            ...prev,
            contactNumber: "Please enter Contact number",
          }));
        case "email":
          return setErrors((prev) => ({
            ...prev,
            email: "Please enter Email",
          }));
        default:
          return null;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));

    if (field === "contactNumber" && !regexNumber.test(value)) {
      return setErrors((prev) => ({
        ...prev,
        contactNumber: "Only numbers (0-9) are allowed",
      }));
    }

    if (field === "email" && !regexEmail.test(value)) {
      return setErrors((prev) => ({
        ...prev,
        email: "Email is in incorrect format",
      }));
    }

    return null;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const name = (nameRef?.current?.value || "").trim();
    const contact = (contactRef?.current?.value || "").trim();
    const email = (emailRef?.current?.value || "").trim();
    const country = countryRef?.current?.value;
    const nameRevalidate = handleBlur(name, "name");
    const contactRevalidate = handleBlur(contact, "contactNumber");
    const emailRevalidate = handleBlur(email, "email");

    if (
      nameRevalidate === null &&
      contactRevalidate === null &&
      emailRevalidate === null
    ) {
      console.log("form result", {
        name,
        contact,
        email,
        country,
      });
    }
  };

  const handleDiscard = () => {
    if (nameRef?.current?.value) {
      nameRef.current.value = "";
    }
    if (contactRef?.current?.value) {
      contactRef.current.value = "";
    }
    if (emailRef?.current?.value) {
      emailRef.current.value = "";
    }
    setErrors(null);
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        handleDiscard={handleDiscard}
        handleContinueEdit={() => setIsOpenModal(false)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#FAFBFB",
        }}
      >
        <div className="form-wrap">
          <div className="form-container">
            <div className="resource-wrapper__title">Edit Support contact</div>
            <h3>
              <span className="custom-edit-title__title-1">
                Support contact
              </span>
              <p className="custom-edit-title__title-2">
                Contact information on who ZP admin can reach out to.
              </p>
            </h3>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="Name">
                  <span>Name</span>
                  <span className="required">*</span>
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  maxLength={100}
                  id="Name"
                  placeholder="Enter name"
                  onBlur={(e) => handleBlur(e.target.value, "name")}
                  data-error={!!errors?.name}
                />
                {errors?.name ? (
                  <span className="err-message">
                    <div className="err-mark">!</div>
                    {errors?.name}
                  </span>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="ContactNumber">
                  <span>Contact number</span>
                  <span className="required">*</span>
                </label>
                <div style={{ display: "flex" }}>
                  <select
                    style={{
                      width: "160px",
                    }}
                    ref={countryRef}
                    defaultValue="Malaysia"
                  >
                    {Object.values(Country).map((country) => (
                      <option
                        value={country.countryName}
                        key={
                          country.countryName +
                          country.countryCode +
                          country.isoCode
                        }
                      >
                        {`${country.countryName} (${country.isoCode}) +${country.countryCode}`}
                      </option>
                    ))}
                  </select>
                  <input
                    data-error={!!errors?.contactNumber}
                    ref={contactRef}
                    type="number"
                    maxLength={15}
                    id="ContactNumber"
                    style={{
                      flex: 1,
                    }}
                    placeholder="Enter contact number"
                    onBlur={(e) => handleBlur(e.target.value, "contactNumber")}
                  />
                </div>

                {errors?.contactNumber ? (
                  <span className="err-message">
                    <div className="err-mark">!</div>
                    {errors?.contactNumber}
                  </span>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="Email">
                  <span>Email</span>
                  <span className="required">*</span>
                </label>
                <input
                  data-error={!!errors?.email}
                  ref={emailRef}
                  type="text"
                  maxLength={100}
                  id="Email"
                  placeholder="Enter email"
                  onBlur={(e) => handleBlur(e.target.value, "email")}
                />
                {errors?.email ? (
                  <span className="err-message">
                    <div className="err-mark">!</div>
                    {errors?.email}
                  </span>
                ) : null}
              </div>
              <div className="form-control" />
            </div>
          </div>
        </div>
        <div className="footer-btn">
          <button className="btn-outline" onClick={() => setIsOpenModal(true)}>
            Cancel
          </button>
          <button
            onClick={handleClick}
            disabled={
              !!errors?.contactNumber || !!errors?.email || !!errors?.name
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
