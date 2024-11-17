import React from "react";
import styles from "./styles.module.scss";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface PopupAlertProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  handleConfirm: () => void;
  primaryAction?: "cancel" | "confirm";
}

const PopupAlert: React.FC<PopupAlertProps> = ({
  trigger,
  title,
  description,
  handleConfirm,
  primaryAction = "confirm",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ? title : "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ? description : "You can't undo this action."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {primaryAction === "confirm" ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Continue
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogAction>Cancel</AlertDialogAction>
              <AlertDialogCancel onClick={handleConfirm}>
                Continue
              </AlertDialogCancel>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupAlert;
