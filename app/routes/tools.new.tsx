import type { ActionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";

import { Input, SelectInput, TextArea } from "~/components/ui";
import { createTool, generateCategoryChoices } from "~/services/tools";
import { ToolCreateSchema } from "~/services/tools/types";
import { response, parseData } from "~/utils";

export async function action({ request }: ActionArgs) {
  try {
    const payload = await parseData(
      await parseFormAny(await request.formData()),
      ToolCreateSchema,
      "Form payload is invalid"
    );
    await createTool(payload);
    return response.redirect("/tools", { authSession: null });
  } catch (cause) {
    return response.error(cause, { authSession: null });
  }
}

export default function NewPost() {
  const zo = useZorm("FormToolScreen", ToolCreateSchema);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="py-4 text-3xl font-black text-[#5344BB]">Créer un lien</h2>
      <img
        src="/assets/img/add-tool.png"
        alt="petit cosmonaute avec un ordinateur"
        className="h-56 rounded-full"
      />
      <Form ref={zo.ref} method="post" className="w-full md:mx-auto md:w-2/4">
        <SelectInput
          name={zo.fields.category()}
          label="Catégorie"
          options={generateCategoryChoices()}
          error={zo.errors.category()?.message}
        />
        <Input
          name={zo.fields.title()}
          label="Titre"
          error={zo.errors.title()?.message}
        />
        <Input
          name={zo.fields.image()}
          label="Image"
          error={zo.errors.image()?.message}
        />
        <Input
          name={zo.fields.url()}
          label="Lien site web"
          error={zo.errors.url()?.message}
        />
        <TextArea
          name={zo.fields.description()}
          label="Description"
          rows={5}
          error={zo.errors.description()?.message}
        />
        <button
          type="submit"
          className="mt-4 w-full rounded bg-[#5344BB] py-3 px-6 font-bold text-white hover:bg-[#685BC6]"
        >
          {isSubmitting ? "En cours ..." : "Créer un lien"}
        </button>
      </Form>
    </div>
  );
}
