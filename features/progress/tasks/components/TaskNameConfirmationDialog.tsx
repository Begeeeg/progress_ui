"use client";

import { useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextInput } from "@/shared/components/ui/FormField";

export default function TaskNameConfirmationDialog({
  taskName,
  action,
  submitting,
  onCancel,
  onConfirm,
}: {
  taskName: string;
  action: "delete" | "leave";
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [confirmation, setConfirmation] = useState("");
  const isDelete = action === "delete";

  return (
    <Modal
      title={isDelete ? "Delete task?" : "Leave task?"}
      description={
        isDelete
          ? "This permanently deletes the task. Type its name to confirm."
          : "You will be unassigned from this task. Type its name to confirm."
      }
      onClose={onCancel}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onConfirm();
        }}
        className="space-y-5"
      >
        <FormField
          label="Task name"
          id="task-name-confirmation"
          hint={`Enter ${taskName} exactly to continue.`}
        >
          <TextInput
            id="task-name-confirmation"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
            autoFocus
            required
          />
        </FormField>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={submitting || confirmation !== taskName}
          >
            {submitting
              ? isDelete
                ? "Deleting..."
                : "Leaving..."
              : isDelete
                ? "Delete task"
                : "Leave task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
