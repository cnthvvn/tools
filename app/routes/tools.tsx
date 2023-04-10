import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { useMatchBaselineRoute } from "~/helpers";
import { generateCategoryChoices, getFavoritesTool } from "~/services/tools";
import { response, tw } from "~/utils";

export async function loader() {
  try {
    const favoriteTools = await getFavoritesTool();
    return response.ok({ favoriteTools }, { authSession: null });
  } catch (cause) {
    throw response.error(cause, { authSession: null });
  }
}

export default function LayoutPage() {
  const { favoriteTools } = useLoaderData<typeof loader>();
  const categoriesLabel = generateCategoryChoices();
  categoriesLabel.unshift({ label: "Toutes", value: "" });

  const hasBaseline = useMatchBaselineRoute();
  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-black px-6">
        <NavLink to="/" className="flex items-center">
          <img
            src="/assets/img/cosmonaute.png"
            alt="petit cosmonaute"
            className="h-12"
          />
          <span className=" text-lg font-bold text-white">Space Tools</span>
        </NavLink>
        <NavLink
          to="new"
          className="rounded bg-[#5344BB] px-4 py-2 font-bold text-white transition hover:bg-[#685BC6]"
        >
          Ajouter un lien
        </NavLink>
      </div>
      <div className="fixed top-16 flex h-20 w-screen overflow-x-auto bg-[#1C1F3E]">
        <nav className="flex items-center justify-center px-6">
          <ul className="flex items-center gap-3">
            {categoriesLabel.map((category) => (
              <NavLink
                key={category.label}
                to={`/tools/${category.value}`}
                className={({ isActive }) =>
                  tw(
                    "flex cursor-pointer items-center justify-center rounded-full bg-[#303467] px-4 py-2 transition ease-in-out",
                    isActive && "bg-[#E9A140]"
                  )
                }
              >
                <li className="text-center text-sm font-bold text-white">
                  {category.label}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex h-screen w-full flex-col bg-slate-50 pt-44 md:fixed md:top-36 md:h-[calc(100vh_-_144px)] md:pt-0">
        <main className="flex h-full overflow-y-auto">
          <div className="fixed h-full w-60 bg-slate-100 px-3 pt-6">
            <p className="text-xl font-bold text-[#5344BB]">Mes favoris</p>
            <ul className="mt-6 flex flex-col items-start">
              {favoriteTools.map((favorite) => (
                <NavLink
                  key={favorite.id}
                  to={`/tools/${favorite.category}/${favorite.id}`}
                  className={({ isActive }) =>
                    tw(
                      "my-1 flex cursor-pointer items-center justify-center rounded-full bg-[#303467] px-4 py-2 transition ease-in-out hover:bg-[#E9A140]",
                      isActive && "bg-[#E9A140]"
                    )
                  }
                >
                  <li className="text-center text-sm font-bold text-white">
                    {favorite.title}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="ml-6 flex flex-1 flex-col pl-60 pr-6 pt-6">
            {hasBaseline && (
              <div className="flex flex-col items-center justify-center pb-8">
                <h1 className="text-3xl font-black text-[#5344BB]">
                  Space Tools
                </h1>
                <p className="mx-auto my-6 text-center text-lg font-extrabold text-slate-600  md:w-1/3 md:text-3xl">
                  Retrouvez ici un ensemble de liens utiles pouvant vous servir
                  au quotidien
                </p>
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
