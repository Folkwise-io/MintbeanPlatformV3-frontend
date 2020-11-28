import React, { FC, useContext } from "react";
import { Context } from "../../../context/contextBuilder";
import { MbContext } from "../../../context/MbContext";
import { Button } from "../blocks/Button";

type Props = {
  userId: string;
  kanbanCanonId: string;
  meetId?: string;
  onCreate: () => void;
};

export const CreateKanbanButton: FC<Props> = ({ userId, kanbanCanonId, meetId, onCreate }) => {
  const context = useContext<Context>(MbContext);
  const createKanban = async () => {
    try {
      await context.kanbanService.createKanban({ userId, kanbanCanonId, meetId });
      onCreate();
    } catch {
      alert("Failed to unlock kanban.");
    }
  };

  return <Button onClick={createKanban}>Unlock a kanban guide!</Button>;
};
