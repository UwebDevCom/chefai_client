import Home from './pages/Home/Home';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SavedRecipe from './pages/SavedRecipe/SavedRecipe';
import Recipe from './pages/Recipe/Recipe';
import { Auth } from './pages/Auth/Auth';
import './style.scss';

import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Home />} errorElement={<ErrorPage />}>
    <Route index path="/" />
    {/* <Route path="/create-recipe" index element={<CreateRecipe />} /> */}
    {/* <Route path="/saved-recipe" index element={<SavedRecipe />} /> */}
    {/* <Route path="/recipes/:id" element={<Recipe />} /> */}
    {/* <Route path="/auth" index element={<Auth />} /> */}
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
