import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // useLoaderData() automatically return the data associated to the loader of this page
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((pizzaItem) => (
        <MenuItem key={pizzaItem.id} pizza={pizzaItem} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
