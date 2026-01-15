import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { store } from "./store";
import { queryClient } from "./services/client.ts";
import { router } from "./router.tsx";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
export default App;
