import { LinkIcon } from "@heroicons/react/24/solid";
import { Link, NavLink, useLoaderData } from "@remix-run/react";

import { getTools } from "~/services/tools";
import { response } from "~/utils";

export const handle = {
  baseline: true,
};

export async function loader() {
  try {
    const tools = await getTools();
    return response.ok({ tools }, { authSession: null });
  } catch (cause) {
    throw response.error(cause, { authSession: null });
  }
}

export default function ToolsPage() {
  const { tools } = useLoaderData<typeof loader>();
  return (
    <>
      {tools.length > 0 ? (
        <ul className="grid auto-rows-max grid-cols-1 gap-3 pb-14 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <li
              key={tool.id}
              className="flex flex-col justify-between rounded-lg border-x-4 border-t-4 border-slate-100 bg-white transition-all duration-200 ease-in-out hover:-translate-y-1 sm:mx-0"
            >
              <NavLink to={`/tools/${tool.category}/${tool.id}`}>
                <div className="h-52 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="rounded-t object-cover"
                  />
                </div>

                <div className="px-4 pb-4">
                  <h3 className="pb-3 pt-2 text-xl font-bold text-[#5344BB]">
                    {tool.title}
                  </h3>
                  <p>{tool.description}</p>
                </div>
              </NavLink>
              <Link
                to={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center bg-slate-100 text-[#1C1F3E] hover:text-[#5344BB]"
              >
                <LinkIcon className="h-6 w-6 " />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/img/cosmonaut-not-found.png"
            alt="Cosmonaute avec une fusée"
            className="h-64 rounded-full"
          />
          <p className="pt-4 text-center font-bold lg:text-xl">
            Aucun lien n'existe pour le moment.
          </p>
        </div>
      )}
    </>
  );
}
