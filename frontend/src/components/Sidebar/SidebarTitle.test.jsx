import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import SidebarTitle from "./SidebarTitle";

describe("Título da sidebar", () => {
  it("Deve renderizar o título", () => {
    render(<SidebarTitle />);
    expect(screen.getByText("Tarefas")).toBeInTheDocument();
  });
});
