import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import classes from "./CreateAdForm.module.css";
import { Sunlight, Water, Cycle, Difficulty } from "../../options";
import FormSelect from "./SelectComponent";

interface FormProps {
  handleSubmit: (v: any) => void;
}

const FormSchema = Yup.object().shape({
  title: Yup.string().min(2).max(30).required("Required Field"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(350, "Too Long!")
    .required("Required Field"),
  email: Yup.string().email("Invalid email").required("Required Field"),
});

const CreateAdForm = ({ handleSubmit }: FormProps) => {
  return (
    <section>
      <h2 className={classes.header}>Create an ad</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          cycle: "",
          difficulty: "",
          watering: "",
          image: "",
          sunlight: "",
          poisonous: false,
          edible: false,
          email: "",
          authorId: "",
          authorName: "",
          indoor: false,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            const formData = new FormData();
            formData.append("file", values.image);
            formData.append("upload_preset", "vbe4uwsu");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/ddobaci06/image/upload",
              {
                body: formData,
                method: "POST",
              }
            );

            const result = await res.json();
            // console.log("result", result.url);

            const imageUrl = result.url;

            const valueWithImage = { ...values, imageUrl };

            handleSubmit(valueWithImage);
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                title: "",
                description: "",
                cycle: "",
                difficulty: "",
                image: "",
                watering: "",
                sunlight: "",
                poisonous: false,
                edible: false,
                email: "",
                authorId: "",
                authorName: "",
                indoor: false,
              },
            });
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label htmlFor="cycle">Lifespan:</label>
                <div id="cycle">
                  <FormSelect
                    selectOptions={Cycle}
                    name="cycle"
                    formValueHolder={props.values.cycle}
                    handleChange={props.handleChange}
                  />
                </div>

                <label>Difficulty:</label>
                <div id="difficulty">
                  <FormSelect
                    selectOptions={Difficulty}
                    formValueHolder={props.values.difficulty}
                    name="difficulty"
                    handleChange={props.handleChange}
                  />
                </div>
              </div>
              <div className={classes.control}>
                <label>Light Conditions:</label>
                <div id="light">
                  <FormSelect
                    selectOptions={Sunlight}
                    name="sunlight"
                    formValueHolder={props.values.sunlight}
                    handleChange={props.handleChange}
                  />
                </div>

                <label>Water requirements:</label>
                <div id="water">
                  <FormSelect
                    selectOptions={Water}
                    name="watering"
                    formValueHolder={props.values.watering}
                    handleChange={props.handleChange}
                  />
                </div>
              </div>
              <div className={classes.checkboxItems}>
                <div className={classes.checkboxItem}>
                  <label>Poisonous</label>
                  <Field type="checkbox" name="poisonous" />
                </div>
                <div className={classes.checkboxItem}>
                  <label>Edible</label>
                  <Field type="checkbox" name="edible" />
                </div>
              </div>
              <div className={classes.control}>
                <label htmlFor="Title">Title:</label>
                <input
                  type="input"
                  id="Title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                  placeholder="Title"
                  name="title"
                />
              </div>
              {props.errors.title && (
                <div className={classes.feedback}>{props.errors.title}</div>
              )}
              <div className={classes.control}>
                <label htmlFor="email">Email:</label>
                <input
                  type="input"
                  id="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email || ""}
                  placeholder="jane.doe@email.com"
                  name="email"
                />
                {props.errors.email && (
                  <div className={classes.feedback}>{props.errors.email}</div>
                )}
              </div>
              <div className={classes.control}>
                <p>
                  <label htmlFor="image">Upload an image: </label>
                  <Field
                    type="file"
                    id="image"
                    name="image"
                    className={classes.customFileUpload}
                    value={""}
                    onChange={(e: any) => {
                      props.setFieldValue("image", e.target.files[0]);
                    }}
                  />
                </p>
              </div>
              <div className={classes.control}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  placeholder="Ad body here..."
                  name="description"
                />
              </div>
              {props.errors.description && (
                <div className={classes.feedback}>
                  {props.errors.description}
                </div>
              )}
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
export default CreateAdForm;
