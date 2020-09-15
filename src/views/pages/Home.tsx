import React, { FC } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../state/actions/userActions";
import { Button } from "../components/Button";
import { UserCard } from "../components/UserCard";
import { ThunkDispatch } from "redux-thunk";
import { Toast } from "../components/Toast";
import { removeToast } from "../../views/state/actions/toastActions";
import { Modal } from "../components/wrappers/Modal";
import { Context } from "../../context/contextBuilder";
import { ModalActionDeclaration } from "../components/wrappers/Modal/ModalActionButton";

type StateMapping = {
  users: UsersState;
  toasts: ToastState;
};
const stp = (state: StoreState) => ({
  users: state.users,
  toasts: state.toasts,
});

type DispatchMapping = {
  fetchUsers: () => void;
  removeToast: (id: string) => void;
};

const dtp = (dispatch: ThunkDispatch<StoreState, Context, MbAction>) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  removeToast: (id: string) => dispatch(removeToast(id)),
});

const UserSection: FC<{ users: UsersState }> = ({ users }) => {
  if (users.loadStatus === "LOADING") {
    return <div>Loading..</div>;
  } else if (users.loadStatus === "ERROR") {
    return <div className="text-red-700">Error!</div>;
  } else {
    return (
      <div>
        {users.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const Home: FC<StateMapping & DispatchMapping> = (props) => {
  const actions: ModalActionDeclaration[] = [
    {
      type: "danger",
      text: "Don't click this button.",
      onClick: (_evt, context) => {
        alert("WTF you clicked the button, you douche.");
        context.closeModal();
      },
    },
  ];
  return (
    <div>
      <Button onClick={() => props.fetchUsers()}>This is a test button</Button>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <div onClick={() => toggleModal()} ref={(el) => setRef(el)}>
            Click me
          </div>
        )}
      >
        Hello World!
      </Modal>

      <UserSection users={props.users} />
      <div>
        {props.toasts.map((toast, index) => (
          <Toast key={index} toast={toast} removeToast={(id) => props.removeToast(id)} />
        ))}
      </div>
    </div>
  );
};

export default connect(stp, dtp)(Home);
