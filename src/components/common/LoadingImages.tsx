import Main from "../layout/_Main";

const renderSkeleton = (j: number) => {
  let content = [];

  for (let i = 0; i < j; i++) {
    content.push(
      <li key={i}>
        <div className="animate-pulse block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
          <div className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] bg-gray-300" />

          <div className=" relative p-3 bg-white">
            <div className="mt-2 h-6 w-9/12 rounded-md bg-gray-300"></div>
          </div>
        </div>
      </li>
    );
  }
  return content;
};
export default function Loading() {
  return (
    <Main>
      <div className="mt-2 h-6 w-3/12 rounded-md bg-gray-300"></div>
      <div className="mt-2 h-6 w-6/12 rounded-md bg-gray-300"></div>
      <div className="mt-2 h-6 w-6/12 rounded-md bg-gray-300"></div>
      <div className="mt-2 h-6 w-6/12 rounded-md bg-gray-300"></div>
      <ul className="mt-20 grid gap-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-4">
        {renderSkeleton(4)}
      </ul>
    </Main>
  );
}
