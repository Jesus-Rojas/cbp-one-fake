import { Outlet } from "react-router-dom";
import { ComingSoon } from "./components/coming-soon/coming-soon";
import { Loading } from "./components/loading/loading";
import { useComingSoon } from "./hooks/use-coming-soon";
import { useLoading } from "./hooks/use-loading";

function App() {
  const { isLoading } = useLoading();
  const { isComingSoon } = useComingSoon();

  return (
    <>
      {isComingSoon && <ComingSoon />}
      {isLoading && <Loading />}
      <Outlet />
    </>
  );
}

export { App };
