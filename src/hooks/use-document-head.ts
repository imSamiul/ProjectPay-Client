import { useEffect } from "react";

type DocumentHeadOptions = {
  title: string;
  description?: string;
};

export function useDocumentHead({ title, description }: DocumentHeadOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionTag = description
      ? document.querySelector('meta[name="description"]')
      : null;
    const previousDescription = descriptionTag?.getAttribute("content") ?? null;

    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== null) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
