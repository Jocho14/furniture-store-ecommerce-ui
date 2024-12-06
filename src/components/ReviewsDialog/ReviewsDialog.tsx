import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { toast } from "sonner";

import { getReviews, addReview } from "@/api/client/products";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollArea";

import Review from "@/components/Review/Review";
import ActionIcon from "../ActionIcon/ActionIcon";
import StarRating from "@/components/StarRating/StarRating";
import { ReviewProps } from "@/components/Review/Review";
import StarsIndicator from "@/components/StarsIndicator/StarsIndicator";

import { Xmark, ArrowLeft } from "iconoir-react";
import styles from "./styles.module.scss";

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
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDivElement>(null);
  const { productId } = useParams<{ productId: string }>();

  const { data: reviewsData } = useQuery<ReviewProps[]>({
    queryKey: ["reviews"],
    queryFn: () => getReviews(Number(productId)),
    staleTime: 1000 * 60 * 5,
  });

  const mutationAddReview = useMutation({
    mutationFn: () => addReview(Number(productId), rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("Error adding review:", error);
    },
  });

  const handleClickOutside = (event: any) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
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
                    aria-label="Back to reviews"
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

                {Array.isArray(reviewsData) ? (
                  reviewsData?.map((review) => {
                    return (
                      <div className="flex flex-col">
                        <Review key={review.reviewId} {...review} />
                        <Separator />
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
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
                  aria-label="Submit review"
                  onClick={() => {
                    handleSubmitReview();
                    setOpen(false);
                    toast("Review submitted successfully");
                  }}
                >
                  Submit Review
                </Button>
              ) : (
                <Button aria-label="write a review" onClick={() => setOpenAddReview(true)}>
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
