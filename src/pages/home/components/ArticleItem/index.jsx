import { UserIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../../../commons/helpers/utils";

const ArticleItem = (post) => {
  return (
    <article
      key={post?.title}
      className="flex flex-col items-start justify-between"
    >
      <div
        className="relative w-full cursor-pointer"
        onClick={() => window.open(post?.url)}
      >
        <img
          src={post?.urlToImage}
          alt={post?.title}
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>

      <div className="max-w-xl  flex-auto">
        <div className="mt-1 flex items-center gap-x-1 text-xs">
          <div>
            <time
              dateTime={post?.publishedAt}
              className="text-gray-500 text-xs pr-1"
            >
              {formatDate(post?.publishedAt)}
            </time>
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-1 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            {post?.source?.name}
          </span>
          <a className="z-10 rounded-full bg-gray-50 px-3 py-1.5 font-small text-gray-600 hover:bg-gray-100">
            {post?.sectionName}
          </a>
        </div>

        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <div
              className="cursor-pointer"
              onClick={() => window.open(post?.url)}
            >
              <span className="absolute inset-0" />
              {post?.title}
            </div>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 ">
            {post?.description}
          </p>
        </div>

        <div className="relative mt-8 flex items-center gap-x-4">
          <UserIcon className="h-5 w-5" aria-hidden="true" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a>
                <span className="absolute inset-0" />
                {post?.author}
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
