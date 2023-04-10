import {
  ArrowLeftIcon,
  BookmarkIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  NavLink,
  useFetcher,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";

import {
  getToolById,
  getCategoryTypeLabel,
  removeTool,
} from "~/services/tools";
import { getRequiredParam, response } from "~/utils/http.server";

export async function loader({ params }: LoaderArgs) {
  try {
    const toolId = getRequiredParam(params, "toolId");
    const tool = await getToolById(toolId);
    return response.ok({ tool }, { authSession: null });
  } catch (cause) {
    throw response.error(cause, { authSession: null });
  }
}

export async function action({ params }: ActionArgs) {
  try {
    const toolId = getRequiredParam(params, "toolId");
    await removeTool(toolId);
    return response.redirect("/tools", { authSession: null });
  } catch (cause) {
    return response.error(cause, { authSession: null });
  }
}

function FavoriteButton({
  isFavorite,
  toolId,
}: {
  isFavorite: boolean;
  toolId: string;
}) {
  const addFavoriteFetcher = useFetcher();
  const removeFavoriteFetcher = useFetcher();
  return (
    <>
      {isFavorite ? (
        <removeFavoriteFetcher.Form method="delete" action="/api/favorites">
          <button
            name="toolId"
            value={toolId}
            className="inline-flex items-center rounded-lg bg-[#303467] p-2 text-center text-sm font-medium text-white"
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </removeFavoriteFetcher.Form>
      ) : (
        <addFavoriteFetcher.Form method="post" action="/api/favorites">
          <button
            name="toolId"
            value={toolId}
            className="inline-flex items-center rounded-lg bg-gray-100 p-2 text-center text-sm font-medium text-[#1C1F3E]"
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </addFavoriteFetcher.Form>
      )}
    </>
  );
}

export default function ToolDetailPage() {
  const { tool } = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center md:mx-auto md:h-full md:w-10/12">
      <NavLink
        to={location.state?.from || "/tools"}
        className="flex items-center space-x-2 self-start py-5"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        <span className="font-bold">Retour à la liste</span>
      </NavLink>
      <img
        src={tool.image}
        alt={tool.title}
        className="h-96 w-full rounded-t object-cover"
      />
      <div className="-mt-8 w-10/12 rounded-lg border-4 border-slate-100 bg-white px-5 pb-20 pt-6 md:w-9/12">
        <div className="flex flex-wrap-reverse items-start justify-between pb-6 pt-2 md:flex-nowrap md:space-x-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-[#5344BB]">{tool.title}</h3>
            <div className="flex items-center space-x-2">
              <Link
                to={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-gray-100 p-2 text-center text-sm font-medium text-[#1C1F3E] hover:bg-[#303467] hover:text-white"
              >
                <LinkIcon className="h-6 w-6" />
              </Link>
              <FavoriteButton isFavorite={tool.isFavorite} toolId={tool.id} />
              <Form method="delete">
                <button
                  type="submit"
                  value={tool.id}
                  className="inline-flex items-center rounded-lg bg-gray-100 p-2 text-center text-sm font-medium text-[#1C1F3E]"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </Form>
            </div>
          </div>
          <span className="my-1 flex w-max rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 md:my-0">
            {getCategoryTypeLabel(tool.category)}
          </span>
        </div>
        <p className="text-lg">{tool.description}</p>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <p>An error occured</p>;
  }

  if (error.status === 404) {
    return (
      <div className="flex flex-col items-center md:mx-auto md:h-full md:w-10/12">
        <img
          src="/assets/img/no-image.jpg"
          alt="placeholder"
          className="h-96 w-full rounded-t object-cover"
        />
        <div className="-mt-8 w-10/12 rounded-lg border-4 border-slate-100 bg-white px-5 pb-20 pt-6 md:w-9/12">
          <div className="flex flex-col items-center">
            <p className="mb-3 text-lg font-bold">
              Ce lien n'existe pas ou a été supprimé.
            </p>
            <NavLink
              to={"/tools"}
              className="rounded bg-[#5344BB] px-4 py-3 font-bold text-white transition hover:bg-[#685BC6]"
            >
              Revenir sur la liste
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return <p>Sorry , there was an error</p>;
}
