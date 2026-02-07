import { create } from "zustand";

import { colors } from "../sets/colors";

type TagType = {
  tag: string;
  count: number;
  color: string;
};

type TagsState = {
  tags: TagType[];
  setTags: (tagList: (string | null)[]) => void;
  addTag: (tag: TagType) => void;
  getTagColor: (tagName: string) => string;
};

export const useTags = create<TagsState>((set, get) => ({
  tags: [],
  setTags: (tagList) =>
    set(() => {
      const tagsCount: { tag: string; count: number }[] = Object.entries(
        tagList.reduce<Record<string, number>>((acc, tag) => {
          if (tag === null) return acc;
          tag.split(",").forEach((tag) => (acc[tag] = (acc[tag] || 0) + 1));
          return acc;
        }, {})
      ).map(([tag, count]) => ({ tag, count }));

      const _tags: TagType[] = tagsCount.map((tag, index) => ({
        ...tag,
        color: colors[index % colors.length]
      }));
      return { tags: _tags };
    }),

  addTag: (tag: TagType) => set((state) => ({ tags: [...state.tags, tag] })),

  getTagColor: (tagName: string) => {
    const { tags } = get();
    const found = tags.find((item) => item.tag === tagName);
    return found !== undefined
      ? found.color
      : colors[tagName.length % colors.length];
  }
}));
