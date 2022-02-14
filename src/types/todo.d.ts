export type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

export type FilterType = "all" | "pending" | "completed";
