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
  const createKanban = () => {
    context && context.kanbanService.createKanban({ userId, kanbanCanonId, meetId }).then(() => onCreate());
  };

  return <Button onClick={createKanban}>Unlock a kanban guide!</Button>;
};

export default connectContext<Props & ConnectContextProps>(CreateKanbanButton);
