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
          <AlertDialogTitle>
            {title ? title : "Czy jesteś pewien?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ? description : "Tej akcji nie można cofnąć"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {primaryAction === "confirm" ? (
            <>
              <AlertDialogCancel>Anuluj</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Kontynuuj
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogAction>Anuluj</AlertDialogAction>
              <AlertDialogCancel onClick={handleConfirm}>
                Kontynuuj
              </AlertDialogCancel>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupAlert;
