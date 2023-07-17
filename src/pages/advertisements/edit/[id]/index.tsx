import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAdvertisementById, updateAdvertisementById } from 'apiSdk/advertisements';
import { Error } from 'components/error';
import { advertisementValidationSchema } from 'validationSchema/advertisements';
import { AdvertisementInterface } from 'interfaces/advertisement';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PublisherInterface } from 'interfaces/publisher';
import { UserInterface } from 'interfaces/user';
import { getPublishers } from 'apiSdk/publishers';
import { getUsers } from 'apiSdk/users';

function AdvertisementEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AdvertisementInterface>(
    () => (id ? `/advertisements/${id}` : null),
    () => getAdvertisementById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AdvertisementInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAdvertisementById(id, values);
      mutate(updated);
      resetForm();
      router.push('/advertisements');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AdvertisementInterface>({
    initialValues: data,
    validationSchema: advertisementValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Advertisement
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
              <FormLabel>Content</FormLabel>
              <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
              {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PublisherInterface>
              formik={formik}
              name={'publisher_id'}
              label={'Select Publisher'}
              placeholder={'Select Publisher'}
              fetcher={getPublishers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'advertiser_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'advertisement',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AdvertisementEditPage);
