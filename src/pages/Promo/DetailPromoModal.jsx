import React from "react";
import {
  Dialog,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

const DetailPromoModal = ({ onClose, promo }) => {
  if (!promo) return null;

  return (
    <Dialog open={!!promo} handler={onClose} size="lg" className="rounded-lg">
      <Dialog.Overlay onClick={onClose}>
        <Dialog.Content onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <Typography variant="h5" className="font-bold">
              {promo.title}
            </Typography>
            <IconButton
              size="sm"
              variant="ghost"
              color="gray"
              onClick={onClose}
              className="absolute right-2 top-2"
            >
              <Xmark className="h-5 w-5" />
            </IconButton>
          </div>

          {/* Body */}
          <div className="mb-4">
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <Typography className="text-gray-700 mb-4">
              {promo.description}
            </Typography>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: promo.terms_condition }}
            />
            <Typography className="text-gray-700 mb-4">
              <strong>Promo Code:</strong> {promo.promo_code}
            </Typography>
            <Typography className="text-gray-700 mb-4">
              <strong>Discount Price:</strong> IDR {promo.promo_discount_price}
            </Typography>
            <Typography className="text-gray-700 mb-4">
              <strong>Minimum Claim Price:</strong> IDR{" "}
              {promo.minimum_claim_price}
            </Typography>
          </div>

          {/* Footer */}
          <div className="mb-1 flex items-center justify-end gap-2 pt-4">
            <Button variant="ghost" color="red" onClick={onClose}>
              Close
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default DetailPromoModal;
