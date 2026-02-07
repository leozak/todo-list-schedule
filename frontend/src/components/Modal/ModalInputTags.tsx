import React, {
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent
} from "react";
import { colors } from "../../sets/colors";

import { useTags } from "../../contexts/TagsContext";

interface ModalInputTagsProps extends InputHTMLAttributes<HTMLInputElement> {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  title?: string;
  error?: string | null;
}

const ModalInputTags = ({
  tags,
  setTags,
  title,
  error,
  ...rest
}: ModalInputTagsProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { getTagColor } = useTags();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Adiciona tag quando pressiona Enter ou vírgula
    if (e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim().replace(",", "");

    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag();
    }
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mb-1">
      {title && (
        <label
          htmlFor={rest.id}
          className="block text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-bold mb-0 sm:mb-1 ml-1"
        >
          {title}
        </label>
      )}
      <div
        onClick={handleInputFocus}
        className="flex flex-wrap gap-2 bg-zinc-300 dark:bg-zinc-800 dark:focus:bg-zinc-900/80 dark:text-zinc-100 p-1 rounded-md"
      >
        {/* Pills das tags */}
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`inline-flex dark:text-zinc-300  text-xs sm:text-sm font-medium rounded-md items-center gap-1 px-2
                        ${getTagColor(tag)}`}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-300 hover:cursor-pointer active:scale-80"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}

        <input
          id={rest.id}
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags?.length === 0 ? rest.placeholder : ""}
          className="flex-1 min-w-24 bg-zinc-300 focus:bg-zinc-400/30 dark:bg-zinc-800 dark:focus:bg-zinc-900/80 dark:text-zinc-100 px-2 text-xs sm:text-sm rounded-md leading-tight focus:shadow-outline focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ModalInputTags;
