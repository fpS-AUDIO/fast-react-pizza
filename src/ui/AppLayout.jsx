import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  // console.log(navigation);
  // { state: "idle", location: undefined, formMethod: undefined, formAction: undefined, formEncType: undefined, formData: undefined, json: undefined, text: undefined }
  // if navigation.state === 'loading' ....

  const isLoading = navigation.state === `loading`;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
