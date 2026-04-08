// src/components/TodoForm.jsx
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TodoContext } from '../context/TodoContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoSchema = Yup.object().shape({
  task: Yup.string().min(2, 'Слишком коротко!').required('Обязательное поле'),
});

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);

  return (
    <Formik
      initialValues={{ task: '' }}
      validationSchema={TodoSchema}
      onSubmit={(values, { resetForm }) => {
        addTodo(values.task);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-2 mb-6">
          <div className="flex gap-2">
            <Field
              as={Input}
              name="task"
              placeholder="Что нужно сделать?"
              className={errors.task && touched.task ? "border-red-500" : ""}
            />
            <Button type="submit">Добавить</Button>
          </div>
          {errors.task && touched.task && (
            <span className="text-red-500 text-sm">{errors.task}</span>
          )}
        </Form>
      )}
    </Formik>
  );
};
export default TodoForm