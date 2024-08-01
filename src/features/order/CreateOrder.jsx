import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  // this is just for feedback for user to disable button
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // check for errors (getting access to the object returned by action function in case of errors)
  const formErrors = useActionData();

  // first you need to use <Form /> component from React Router (not standard <form />)
  // then you need to specify the method: POST, PATCH, DELETE (not GET)
  // then you need to specify the action which is the path where the form should be submitted to
  // if not action is specified the default will be used (React Router will simply match the closest route)
  // example: <Form method="POST" action="/order/new">
  // then you need to create an action (function under component)
  // when <Form /> is submitted a request will be created and intersepted by action function (indeed should be connecte to React Router)
  // this technique doesn't need any submit form function, loading state or controlled elements
  // React Router does everything behind the scene

  // to manage errors just before create a POST request check if everything is ok
  // if not just return an object which will be intersepted by React Router
  // then you can read this data inside the component with 'useActionData' hook
  // to create some UI output for user
  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {/* check if there is any error from useActionData */}
            {formErrors?.phone && formErrors.phone}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* to add more data to the form (which is outside the form) like cart data */}
          {/* you can use a hidden input field */}
          {/* just if you want to pas an object to need to transform to string it */}
          {/* this way then form will be submitted this data will be also shows in the data but used doesn't see it */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

// by convention it's called 'action'
// so when the <Form /> is submitted the request will be passed into this function
//
export async function action({ request }) {
  // formData() is regular browser API which returns formData object
  const formData = await request.formData();

  // then for a better usuability transform no normal object
  const data = Object.fromEntries(formData);

  // creating a nice object to work with
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // this indeed returns a boolean
    priority: data.priority === "on",
  };

  // checking for errors
  // creating errors object
  const errors = {};

  // checking only phone number just for example
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a correct phone number";

  // check if there is at least one error
  // if it's return object of errors instead of doing a POST request
  if (Object.keys(errors).length > 0) return errors;

  // createOrder() is an imported function which contains the logic of API POST request
  // this function returns a newly created object (from API)
  // inside the component you can get access to the data returned from this action function
  // in this case it's object of errors
  // this data can be read with useLoaderData hook and create some UI output for user
  const newOrder = await createOrder(order);

  // now you can redirect user to new order Route
  // but you can't use 'useNavigate' since it's outside a component
  // so you can use 'redirect'
  // 'redirect' function will create a new response and it works with web API
  // so if you return a new response from this function the browser will follow that response
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
