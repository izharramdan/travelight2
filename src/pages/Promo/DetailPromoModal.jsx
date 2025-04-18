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
    <Dialog open={!!promo} handler={onClose} size="lg" className="rounded-xl">
      <Dialog.Overlay onClick={onClose}>
        <Dialog.Content
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-6 bg-white shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h5" className="font-bold text-blue-600">
              {promo.title}
            </Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              onClick={onClose}
              className="absolute right-2 top-2"
              isCircular
            >
              <Xmark className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>

          {/* Image */}
          <img
            src={promo.imageUrl}
            alt={promo.title}
            className="w-full h-56 object-cover rounded-lg mb-4 shadow"
            onError={(e) => {
              e.target.src =
                "https://www.hiphopshakespeare.com/wp-content/uploads/2013/11/dummy-image-landscape-1024x585.jpg";
            }}
          />

          {/* Description */}
          <Typography className="text-sm text-gray-700 mb-4">
            {promo.description}
          </Typography>

          {/* Terms & Conditions */}
          <div
            className="text-sm text-gray-700 mb-4 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: promo.terms_condition }}
          />

          {/* Promo Details */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-blue-50 p-4 rounded-md border">
              <Typography className="text-gray-700 font-medium">
                Promo Code
              </Typography>
              <Typography className="text-blue-600 font-bold">
                {promo.promo_code}
              </Typography>
            </div>
            <div className="bg-green-50 p-4 rounded-md border">
              <Typography className="text-gray-700 font-medium">
                Discount Price
              </Typography>
              <Typography className="text-green-600 font-bold">
                IDR {promo.promo_discount_price?.toLocaleString()}
              </Typography>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md border sm:col-span-2">
              <Typography className="text-gray-700 font-medium">
                Minimum Claim Price
              </Typography>
              <Typography className="text-yellow-600 font-bold">
                IDR {promo.minimum_claim_price?.toLocaleString()}
              </Typography>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2">
            <Button variant="solid" onClick={onClose}>
              Close
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default DetailPromoModal;
