const Responsividade = () => {
  return (
    <div className="absolute top-2 text-sm dark:text-gray-400">
      <h1>Responsividade</h1>
      <div className="hidden sm:block">
        sm 40rem (640px) @media (width &gt;= 40rem)
      </div>
      <div className="hidden md:block">
        md 48rem (768px) @media (width &gt;= 48rem)
      </div>
      <div className="hidden lg:block">
        lg 64rem (1024px) @media (width &gt;= 64rem)
      </div>
      <div className="hidden xl:block">
        xl 80rem (1280px) @media (width &gt;= 80rem)
      </div>
      <div className="hidden 2xl:block">
        2xl 96rem (1536px) @media (width &gt;= 96rem)
      </div>
    </div>
  );
};

export default Responsividade;
