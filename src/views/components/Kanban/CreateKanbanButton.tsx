import React, { FC } from "react";
import { connectContext, ConnectContextProps } from "../../../context/connectContext";
import { Button } from "../Button";

type Props = {
  userId: string;
  kanbanCanonId: string;
  meetId?: string;
  onCreate: () => void;
};

const CreateKanbanButton: FC<Props & ConnectContextProps> = ({ userId, kanbanCanonId, meetId, context, onCreate }) => {
  const createKanban = async () => {
    if (!context) return;
    try {
      await context.kanbanService.createKanban({ userId, kanbanCanonId, meetId });
      onCreate();
    } catch {
      alert("Failed to unlock kanban.");
    }
  };

  return <Button onClick={createKanban}>Unlock a kanban guide!</Button>;
};

export default connectContext<Props & ConnectContextProps>(CreateKanbanButton);
