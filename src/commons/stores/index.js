import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePreferences = create(
  persist(
    (set, get) => ({
      category: [],
      sources: [],
      author: [],
      setPrefCategory: (cat) => set({ category: cat }),
      setPrefSources: (sources) => set({ sources }),
      setPrefAuthor: (author) => set({ author }),
    }),
    {
      name: "news-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default usePreferences;
