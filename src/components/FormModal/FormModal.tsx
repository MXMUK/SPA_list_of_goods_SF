import React, { memo, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { createItem, getAll } from '../../api/Goods';
import { setGoods } from '../../features/goods';
import { useDispatch } from 'react-redux';

type Props = {
  onClose: (isOpen: boolean) => void;
};

interface reqBody {
  name: string;
  author: string | null;
  publicationYear: string | null;
  rating: string;
  price: string;
  description: string;
  photo: string;
  stock: string;
  category: string;
}

export const TodoModal: React.FC<Props> = memo(({ onClose }) => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required('Required name'),
        author: yup.string(),
        publicationYear: yup.number(),
        rating: yup.number().required('Required rating'),
        price: yup.number().required('Required price'),
        photo: yup.string().required('Required photo'),
        description: yup.string().required('Required description'),
        stock: yup.number().required('Required stock'),
        category: yup.string().required('Required category'),
      }),
    [],
  );

  const dispatch = useDispatch();

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-card">
        <div className="modal-card-head">
          <div className="modal-card-title has-text-weight-medium has-text-success">Add</div>

          <button type="button" className="delete" onClick={() => onClose(false)} />
        </div>

        <div className="modal-card-body">
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              author: '',
              publicationYear: '',
              rating: '',
              price: '',
              description: '',
              photo: '',
              stock: '',
              category: '',
            }}
            onSubmit={async (values: reqBody) => {
              try {
                if (!values.author) {
                  values.author = null;
                }

                if (!values.publicationYear) {
                  values.publicationYear = null;
                }

                await createItem(values);
              } catch (err) {
                console.log(err);
              } finally {
                const allGoods = await getAll();

                dispatch(setGoods(allGoods));
                onClose(false);
              }
            }}>
            {({ isSubmitting, errors }) => (
              <Form>
                <Field className="input mt-3" name="name" type="text" placeholder="Name" />
                {errors.name ?? <div>{errors.name}</div>}

                <Field className="input mt-3" name="author" type="text" placeholder="Author" />
                {errors.author ?? <div>{errors.author}</div>}

                <Field
                  className="input mt-3"
                  name="publicationYear"
                  type="text"
                  placeholder="Year of publication"
                />
                {errors.publicationYear ?? <div>{errors.publicationYear}</div>}

                <Field className="input mt-3" name="rating" type="text" placeholder="Rating" />
                {errors.rating ?? <div>{errors.rating}</div>}

                <Field className="input mt-3" name="price" type="text" placeholder="Price" />
                {errors.price ?? <div>{errors.price}</div>}

                <Field
                  className="input mt-3"
                  name="description"
                  type="text"
                  placeholder="Description"
                />
                {errors.description ?? <div>{errors.description}</div>}

                <Field className="input mt-3" name="photo" type="text" placeholder="Photo link" />
                {errors.photo ?? <div>{errors.photo}</div>}

                <Field className="input mt-3" name="stock" type="text" placeholder="Stock" />
                {errors.stock ?? <div>{errors.stock}</div>}

                <Field className="input mt-3" name="category" type="text" placeholder="Category" />
                {errors.category ?? <div>{errors.category}</div>}

                <button
                  className="button is-success mt-6 is-pulled-right"
                  type="submit"
                  disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
});
