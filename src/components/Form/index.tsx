import InternalForm from './Form';
import Item from './Item';
import useForm from './hooks/useForm';
import useWatch from './hooks/useWatch';
export * from './typings';
export * from './hooks/useForm';


type FormType = typeof InternalForm & {
  Item: typeof Item;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
};

const Form = InternalForm as FormType;

Form.Item = Item;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;
