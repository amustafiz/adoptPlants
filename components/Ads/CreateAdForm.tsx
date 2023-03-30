import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import classes from "./CreateAdForm.module.css";
import { Sunlight, Water, Cycle, Difficulty } from "../../options";
import FormSelect from "./SelectComponent";

export interface FormValueProps {
  title: string;
  content: string;
}

interface FormProps {
  handleSubmit: (v: FormValueProps) => void;
}

const FormSchema = Yup.object().shape({
  title: Yup.string().min(2).max(30).required("Required Field"),
  content: Yup.string()
    .min(2, "Too Short!")
    .max(350, "Too Long!")
    .required("Required Field"),
  email: Yup.string().email("Invalid email").required("Required Field"),
});

const CreateAdForm = ({ handleSubmit }: FormProps) => (
  <section>
    <h2 className={classes.header}>Create an ad</h2>
    <Formik
      initialValues={{
        title: "",
        content: "",
        lifespan: "",
        difficulty: "",
        watering: "",
        image: "",
        sunlight: "",
        poisonous: false,
        edible: false,
        email: "",
      }}
      validationSchema={FormSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              title: "",
              content: "",
              lifespan: "",
              difficulty: "",
              image: "",
              watering: "",
              sunlight: "",
              poisonous: false,
              edible: false,
              email: "",
            },
          });
        }, 1000);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className={classes.form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="lifespan">Lifespan:</label>
              <div id="lifespan">
                <FormSelect
                  selectOptions={Cycle}
                  name="lifespan"
                  formValueHolder={props.values.lifespan}
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
            {/* <div className={classes.control}>
              <p>
                <label htmlFor="file-upload">Upload an image: </label>
                <Field
                  type="file"
                  id="file-upload"
                  name="image"
                  className={classes.customFileUpload}
                  value={props.values.image}
                  onChange={}
                />
              </p>
            </div> */}
            <div className={classes.control}>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.content}
                placeholder="Ad body here..."
                name="content"
              />
            </div>
            {props.errors.content && (
              <div className={classes.feedback}>{props.errors.content}</div>
            )}
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </Formik>
  </section>
);

export default CreateAdForm;
