import { ReactElement } from "react"
import { Link } from "react-router-dom"

export default function ErrorPage(): ReactElement {
  return (
    <div className="flex flex-col gap-5 text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-4xl font-semibold">Page Not Found</p>
      <Link
        to="/"
        className="bg-white text-blue-500 hover:text-blue-400 p-2 rounded-lg font-medium"
      >
        Back to homepage
      </Link>
    </div>
  )
}
