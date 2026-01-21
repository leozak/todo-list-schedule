import { useEffect, useState } from "react";

const SidebarExpanded = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  });
  return (
    <div className="">
      <h1>SidebarExpanded</h1>
      <p>{userName}</p>
    </div>
  );
};

export default SidebarExpanded;
