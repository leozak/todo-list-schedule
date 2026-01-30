interface ModalHeaderTitleProps {
  title: string;
}

const ModalHeaderTitle = ({ title }: ModalHeaderTitleProps) => {
  return (
    <h1 className="flex w-full text-zinc-900 dark:text-zinc-200 text-base sm:text-xl font-bold justify-center">
      {title}
    </h1>
  );
};

export default ModalHeaderTitle;
