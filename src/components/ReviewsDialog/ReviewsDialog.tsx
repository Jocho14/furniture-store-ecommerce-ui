import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollArea";
import classNames from "classnames";
import styles from "./styles.module.scss";
import StarsIndicator from "../StarsIndicator/StarsIndicator";
import Review from "@/components/Review/Review";
import { useParams } from "react-router-dom";
import { getReviews } from "@/api/client/products";
import { ReviewProps } from "@/components/Review/Review";
import { useQuery, useMutation } from "@tanstack/react-query";
import ActionIcon from "../ActionIcon/ActionIcon";
import { Xmark, ArrowLeft } from "iconoir-react";
import StarRating from "@/components/StarRating/StarRating";
import { addReview } from "@/api/client/products";

interface ReviewsDialogProps {
  trigger?: React.ReactNode;
  productName: string;
}

const ReviewsDialog: React.FC<ReviewsDialogProps> = ({
  trigger,
  productName,
}) => {
  const [open, setOpen] = useState(false);
  const [openAddReview, setOpenAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const { productId } = useParams<{ productId: string }>();

  const { data: reviewsData } = useQuery<ReviewProps[]>({
    queryKey: ["reviews"],
    queryFn: () => getReviews(Number(productId)),
    staleTime: 1000 * 60 * 5,
  });

  const mutationAddReview = useMutation({
    mutationFn: () => addReview(Number(productId), rating, comment),
    onSuccess: (data: any) => {
      console.log("Review added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const handleClickOutside = (event: any) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log("Selected rating:", newRating);
  };

  const handleSubmitReview = () => {
    mutationAddReview.mutate();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setOpenAddReview(false);
    };
  }, [open]);
  return (
    <div className={styles["dialog-content__wrapper"]}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent
          ref={dialogRef}
          className={classNames(styles["dialog-content"])}
        >
          <div className={classNames(styles["dialog-content__container"])}>
            <div className={classNames(styles["dialog-content__header"])}>
              <ActionIcon
                size="large"
                icon={<Xmark />}
                className={styles["x-button"]}
                onClick={() => setOpen(false)}
              />
              {openAddReview ? (
                <div className="flex align-start">
                  <Button
                    variant="secondary"
                    onClick={() => setOpenAddReview(false)}
                    className="flex gap-3"
                  >
                    <ArrowLeft />
                    Back to reviews
                  </Button>
                </div>
              ) : (
                <>
                  5,0
                  <StarsIndicator percentage={75} />
                </>
              )}
            </div>
            {openAddReview ? (
              <div
                className={classNames(
                  styles["dialog-content__add-review"],
                  "w-full"
                )}
              >
                <Separator />
                <span className={styles["dialog-content__add-review__title"]}>
                  {" "}
                  {`Add review for ${productName}`}
                </span>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h2>Select rating</h2>
                    <StarRating onRatingChange={handleRatingChange} />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h2>Write a review (optional)</h2>
                    <Textarea
                      className="h-[180px] max-h-[250px]"
                      placeholder="Click here to write your review..."
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <ScrollArea
                className={classNames(
                  styles["dialog-content__scroll-area"],
                  "w-full"
                )}
              >
                <Separator />

                {reviewsData?.map((review) => {
                  return (
                    <div className="flex flex-col">
                      <Review key={review.reviewId} {...review} />
                      <Separator />
                    </div>
                  );
                })}
              </ScrollArea>
            )}
            <div
              className={classNames(
                styles["dialog-content__footer"],
                "flex-none"
              )}
            >
              {openAddReview ? (
                <Button
                  onClick={() => {
                    handleSubmitReview();
                    setOpen(false);
                    toast("Review submitted successfully");
                  }}
                >
                  Submit Review
                </Button>
              ) : (
                <Button onClick={() => setOpenAddReview(true)}>
                  Write a review
                </Button>
              )}
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewsDialog;
