import { defineField, defineType } from "sanity";

export default defineType({
  name: "auteur",
  title: "Auteur·e",
  type: "document",
  fields: [
    defineField({ name: "nom", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Fonction", type: "string", description: "Ex. : Journaliste, Rédaction Politique" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio courte", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "nom", subtitle: "role", media: "photo" },
  },
});
