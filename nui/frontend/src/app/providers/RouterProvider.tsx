import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HUDLayout } from '~/pages/layouts'
import { pathKeys } from '~/shared/lib/react-router'
import { characterCreatorRoute } from '~/pages/character-creator'

const router = createBrowserRouter([
  {
    path: pathKeys.hud(),
    element: <HUDLayout/>,
    children: [
      characterCreatorRoute
    ],
  }
])

export function BrowserRouter () {
  return <RouterProvider router={router}/>
}