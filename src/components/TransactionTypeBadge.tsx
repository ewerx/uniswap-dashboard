import { TransactionType } from "@/model/transaction";
import { Badge } from "@nextui-org/react";

export const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  switch (type) {
    case TransactionType.SWAP:
      return (
        <Badge variant="flat" color="primary">
          Swap
        </Badge>
      );
    case TransactionType.MINT:
      return (
        <Badge variant="flat" color="secondary">
          Mint
        </Badge>
      );
    case TransactionType.BURN:
      return (
        <Badge variant="flat" color="warning">
          Burn
        </Badge>
      );
  }
};
