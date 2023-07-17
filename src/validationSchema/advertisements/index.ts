import * as yup from 'yup';

export const advertisementValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  publisher_id: yup.string().nullable(),
  advertiser_id: yup.string().nullable(),
});
