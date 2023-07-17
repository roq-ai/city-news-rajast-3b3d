import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  publisher_id: yup.string().nullable(),
  editor_id: yup.string().nullable(),
  reporter_id: yup.string().nullable(),
});
