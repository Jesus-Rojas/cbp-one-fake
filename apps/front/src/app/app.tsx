import { Outlet } from "react-router-dom";
import { Loading } from "./components/loading/loading";
import { useLoading } from "./hooks/use-loading";

function App() {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && <Loading />}
      <Outlet />
    </>
  );
}

export { App };
