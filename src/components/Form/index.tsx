import InternalForm from './Form';
import Item from './Item';
export * from './typings';


type FormType = typeof InternalForm & {
  Item: typeof Item;
};

const Form = InternalForm as FormType;

Form.Item = Item;

export default Form;
