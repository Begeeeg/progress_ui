"use client";

import { useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextInput } from "@/shared/components/ui/FormField";

export default function ProjectNameConfirmationDialog({
  projectName,
  action,
  submitting,
  onCancel,
  onConfirm,
}: {
  projectName: string;
  action: "delete" | "leave";
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [confirmation, setConfirmation] = useState("");
  const isDelete = action === "delete";

  return (
    <Modal
      title={isDelete ? "Delete project?" : "Leave project?"}
      description={
        isDelete
          ? "This permanently deletes the project. Type its name to confirm."
          : "You will lose access to this shared project. Type its name to confirm."
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
          label="Project name"
          id="project-name-confirmation"
          hint={`Enter ${projectName} exactly to continue.`}
        >
          <TextInput
            id="project-name-confirmation"
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
            disabled={submitting || confirmation !== projectName}
          >
            {submitting
              ? isDelete
                ? "Deleting..."
                : "Leaving..."
              : isDelete
                ? "Delete project"
                : "Leave project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
