import Main from "../layout/Main";

export default function Loading() {
  return (
    <Main>
      <ul className="mt-4 grid gap-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <div className="mt-12 animate-pulse flex-row items-center justify-center rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </li>
        <li>
          <div className="mt-12 animate-pulse flex-row items-center justify-center rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </li>
        <li>
          <div className="mt-12 animate-pulse flex-row items-center justify-center rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </li>
        <li>
          <div className="mt-12 animate-pulse flex-row items-center justify-center rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </li>
      </ul>
    </Main>
  );
}
