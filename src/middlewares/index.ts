import { handleErrors } from "./handleErrors.middlewares";

import { validateBody, verifyAdmin, verifyToken } from "./util.middlewares";

import {
  verifyUserIdExists,
  verifyEmailExists,
  verifyUserPermission,
} from "./user.middlewares";

import {
  verifyAddressIdExists,
  verifyAddressPermission,
} from "./address.middlewares";

import { verifyProductIdExists } from "./product.middlewares";

import { verifyCartIdExists, verifyCartPermission } from "./cart.middlewares";

import {
  verifyFavoriteIdExists,
  verifyFavoritePermission,
} from "./favorite.middlewares";

import {
  verifyOrderIdExists,
  verifyOrderPermission,
} from "./order.middlewares";

export default {
  handleErrors,
  validateBody,
  verifyToken,
  verifyAdmin,
  verifyUserIdExists,
  verifyEmailExists,
  verifyUserPermission,
  verifyAddressIdExists,
  verifyAddressPermission,
  verifyProductIdExists,
  verifyCartIdExists,
  verifyCartPermission,
  verifyFavoriteIdExists,
  verifyFavoritePermission,
  verifyOrderIdExists,
  verifyOrderPermission,
};
