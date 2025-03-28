"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tag = exports.inventoryManagement = exports.address = exports.review = exports.orderDetails = exports.order = exports.paymentMethod = exports.productVariant = exports.product = exports.manufacturer = exports.category = exports.twoFactorConfirmation = exports.account = exports.user = exports.twoFactorToken = exports.passwordResetToken = exports.verificationToken = exports.discountType = exports.potency = exports.unitOfMeasure = exports.paymentStatus = exports.productForm = exports.skuLocation = exports.productStatus = exports.addressType = exports.paymentType = exports.deliveryStatus = exports.movementType = exports.userRole = exports.orderType = exports.customId = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const ENTITY_PREFIX = {
    USER: "USR",
    PRODUCT: "PRD",
    ORDER: "ORD",
    CATEGORY: "CAT",
    MANUFACTURER: "MFR",
    REVIEW: "REV",
    ACCOUNT: "ACC",
    VERIFICATION: "VRF",
    PASSWORD_RESET: "PWD",
    TWO_FACTOR: "2FA",
    ORDER_DETAILS: "ODT",
    ADDRESS: "ADDR",
    PAYMENT: "PYMT",
    INVENTORY: "INV",
};
const customId = (name, prefix) => (0, pg_core_1.varchar)(name, { length: 32 })
    .notNull()
    .primaryKey()
    .unique()
    .$defaultFn(() => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    const sequence = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${prefix}_${timestamp}${random}${sequence}`;
});
exports.customId = customId;
exports.orderType = (0, pg_core_1.pgEnum)("OrderType", ["OFFLINE", "ONLINE"]);
exports.userRole = (0, pg_core_1.pgEnum)("UserRole", ["ADMIN", "USER"]);
exports.movementType = (0, pg_core_1.pgEnum)("MovementType", ["IN", "OUT", "ADJUSTMENT"]);
exports.deliveryStatus = (0, pg_core_1.pgEnum)("DeliveryStatus", [
    "PROCESSING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
]);
exports.paymentType = (0, pg_core_1.pgEnum)("PaymentType", [
    "CREDIT_CARD",
    "DEBIT_CARD",
    "UPI",
    "NET_BANKING",
    "WALLET",
]);
exports.addressType = (0, pg_core_1.pgEnum)("AddressType", ["SHIPPING", "BILLING"]);
exports.productStatus = (0, pg_core_1.pgEnum)("ProductStatus", [
    "ACTIVE",
    "DRAFT",
    "ARCHIVED",
]);
exports.skuLocation = (0, pg_core_1.pgEnum)("SKULocation", [
    "MANGALORE-01",
    "MANGALORE-02",
    "KERALA-01",
]);
exports.productForm = (0, pg_core_1.pgEnum)("ProductForm", [
    "NONE",
    "DILUTIONS(P)",
    "MOTHER_TINCTURES(Q)",
    "TRITURATIONS",
    "TABLETS",
    "GLOBULES",
    "BIO_CHEMIC",
    "BIO_COMBINATION",
    "OINTMENT",
    "GEL",
    "CREAM",
    "SYRUP/TONIC",
    "DROPS",
    "EYE_DROPS",
    "EAR_DROPS",
    "NASAL_DROPS",
    "INJECTIONS",
]);
exports.paymentStatus = (0, pg_core_1.pgEnum)("PaymentStatus", [
    "PENDING",
    "AUTHORIZED",
    "PAID",
    "FAILED",
    "REFUNDED",
]);
exports.unitOfMeasure = (0, pg_core_1.pgEnum)("UnitOfMeasure", [
    "NONE",
    "TABLETS",
    "ML",
    "GM(s)",
    "DROPS",
    "AMPOULES",
]);
exports.potency = (0, pg_core_1.pgEnum)("potency", [
    "NONE",
    "1X",
    "2X",
    "3X",
    "6X",
    "12X",
    "30X",
    "200X",
    "3C",
    "6C",
    "12C",
    "30C",
    "200C",
    "1M",
    "10M",
    "50M",
    "CM",
    "3CH",
    "6CH",
    "9CH",
    "12CH",
    "15CH",
    "30CH",
    "200CH",
    "1M CH",
    "10M CH",
    "50M CH",
    "CM CH",
    "Q",
    "LM1",
    "LM2",
    "LM3",
    "LM4",
    "LM5",
    "LM6",
    "LM7",
    "LM8",
    "LM9",
    "LM10",
    "LM11",
    "LM12",
    "LM13",
    "LM14",
    "LM15",
    "LM16",
    "LM17",
    "LM18",
    "LM19",
    "LM20",
    "LM21",
    "LM22",
    "LM23",
    "LM24",
    "LM25",
    "LM26",
    "LM27",
    "LM28",
    "LM29",
    "LM30",
    "LM50",
]);
exports.discountType = (0, pg_core_1.pgEnum)("discountType", ["PERCENTAGE", "FIXED"]);
exports.verificationToken = (0, pg_core_1.pgTable)("VerificationToken", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.VERIFICATION),
    email: (0, pg_core_1.text)("email").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { precision: 3, mode: "date" }).notNull(),
}, (table) => {
    return {
        emailTokenKey: (0, pg_core_1.uniqueIndex)("VerificationToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
        tokenKey: (0, pg_core_1.uniqueIndex)("VerificationToken_token_key").using("btree", table.token.asc().nullsLast()),
    };
});
exports.passwordResetToken = (0, pg_core_1.pgTable)("PasswordResetToken", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.PASSWORD_RESET),
    email: (0, pg_core_1.text)("email").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { precision: 3, mode: "date" }).notNull(),
}, (table) => {
    return {
        emailTokenKey: (0, pg_core_1.uniqueIndex)("PasswordResetToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
        tokenKey: (0, pg_core_1.uniqueIndex)("PasswordResetToken_token_key").using("btree", table.token.asc().nullsLast()),
    };
});
exports.twoFactorToken = (0, pg_core_1.pgTable)("TwoFactorToken", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.TWO_FACTOR),
    email: (0, pg_core_1.text)("email").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { precision: 3, mode: "date" }).notNull(),
}, (table) => {
    return {
        emailTokenKey: (0, pg_core_1.uniqueIndex)("TwoFactorToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
        tokenKey: (0, pg_core_1.uniqueIndex)("TwoFactorToken_token_key").using("btree", table.token.asc().nullsLast()),
    };
});
exports.user = (0, pg_core_1.pgTable)("User", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.USER),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email"),
    emailVerified: (0, pg_core_1.timestamp)("emailVerified", { precision: 3, mode: "date" }),
    image: (0, pg_core_1.text)("image"),
    password: (0, pg_core_1.text)("password"),
    role: (0, exports.userRole)("role").default("USER").notNull(),
    lastActive: (0, pg_core_1.timestamp)("lastActive", { precision: 3, mode: "date" })
        .defaultNow()
        .notNull(),
    isTwoFactorEnabled: (0, pg_core_1.boolean)("isTwoFactorEnabled").default(false).notNull(),
    phone: (0, pg_core_1.text)("phone"),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { precision: 3, mode: "date" })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { precision: 3, mode: "date" })
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => {
    return {
        emailKey: (0, pg_core_1.uniqueIndex)("User_email_key").using("btree", table.email.asc().nullsLast()),
    };
});
exports.account = (0, pg_core_1.pgTable)("Account", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.ACCOUNT),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
    type: (0, pg_core_1.text)("type").notNull(),
    provider: (0, pg_core_1.text)("provider").notNull(),
    providerAccountId: (0, pg_core_1.text)("providerAccountId").notNull(),
    refreshToken: (0, pg_core_1.text)("refresh_token"),
    accessToken: (0, pg_core_1.text)("access_token"),
    expiresAt: (0, pg_core_1.varchar)("expires_at", { length: 32 }),
    tokenType: (0, pg_core_1.text)("token_type"),
    scope: (0, pg_core_1.text)("scope"),
    idToken: (0, pg_core_1.text)("id_token"),
    sessionState: (0, pg_core_1.text)("session_state"),
}, (table) => {
    return {
        providerProviderAccountIdKey: (0, pg_core_1.uniqueIndex)("Account_provider_providerAccountId_key").using("btree", table.provider.asc().nullsLast(), table.providerAccountId.asc().nullsLast()),
        accountUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "Account_userId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
    };
});
exports.twoFactorConfirmation = (0, pg_core_1.pgTable)("TwoFactorConfirmation", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.TWO_FACTOR),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
}, (table) => {
    return {
        userIdKey: (0, pg_core_1.uniqueIndex)("TwoFactorConfirmation_userId_key").using("btree", table.userId.asc().nullsLast()),
        twoFactorConfirmationUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "TwoFactorConfirmation_userId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
    };
});
exports.category = (0, pg_core_1.pgTable)("Category", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.CATEGORY),
    name: (0, pg_core_1.text)("name").notNull(),
    parentId: (0, pg_core_1.varchar)("parentId", { length: 32 }),
}, (table) => {
    return {
        categoryParentIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.parentId],
            foreignColumns: [table.id],
            name: "Category_parentId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("set null"),
        categoryTreeIdx: (0, pg_core_1.index)("idx_category_tree").on(table.id, table.parentId),
        categoryParentIdx: (0, pg_core_1.index)("idx_category_parent").on(table.parentId),
    };
});
exports.manufacturer = (0, pg_core_1.pgTable)("Manufacturer", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.MANUFACTURER),
    name: (0, pg_core_1.text)("name").notNull(),
});
exports.product = (0, pg_core_1.pgTable)("Product", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.PRODUCT),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    form: (0, exports.productForm)("form").notNull(),
    unit: (0, exports.unitOfMeasure)("unit").notNull(),
    status: (0, exports.productStatus)("status").default("ACTIVE").notNull(),
    tags: (0, pg_core_1.text)("tags").array(),
    categoryId: (0, pg_core_1.varchar)("categoryId", { length: 32 }).notNull(),
    manufacturerId: (0, pg_core_1.varchar)("manufacturerId", { length: 32 }).notNull(),
    hsnCode: (0, pg_core_1.varchar)("hsnCode", { length: 8 }).default("30049014"),
    tax: (0, pg_core_1.integer)("tax").default(0).notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt")
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => {
    return {
        productCategoryIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.categoryId],
            foreignColumns: [exports.category.id],
            name: "Product_categoryId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("restrict"),
        productManufacturerIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.manufacturerId],
            foreignColumns: [exports.manufacturer.id],
            name: "Product_manufacturerId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("restrict"),
        productNameIndex: (0, pg_core_1.index)("product_name_idx").on(table.name),
        productStatusIndex: (0, pg_core_1.index)("product_status_idx").on(table.status),
        productCategoryIndex: (0, pg_core_1.index)("product_category_idx").on(table.categoryId),
        productCreatedAtIndex: (0, pg_core_1.index)("product_created_at_idx").on(table.createdAt),
        productFormUnitIndex: (0, pg_core_1.index)("product_form_unit_idx").on(table.unit, table.form),
        productCategoryStatusIdx: (0, pg_core_1.index)("product_category_status_idx").on(table.categoryId, table.status),
    };
});
exports.productVariant = (0, pg_core_1.pgTable)("ProductVariant", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.PRODUCT + "VAR"),
    productId: (0, pg_core_1.varchar)("productId", { length: 32 }).notNull(),
    sku: (0, pg_core_1.varchar)("sku", { length: 50 }).notNull().unique(),
    variantName: (0, pg_core_1.text)("variantName").notNull(),
    variantImage: (0, pg_core_1.text)("variantImage").array().notNull(),
    potency: (0, exports.potency)("potency").default("NONE").notNull(),
    packSize: (0, pg_core_1.integer)("packSize"),
    stockByLocation: (0, pg_core_1.jsonb)("stockByLocation")
        .$type()
        .notNull()
        .default([]),
    costPrice: (0, pg_core_1.doublePrecision)("costPrice"),
    mrp: (0, pg_core_1.doublePrecision)("mrp").notNull(),
    discount: (0, pg_core_1.integer)("discount").default(0),
    discountType: (0, exports.discountType)("discountType").default("PERCENTAGE"),
    sellingPrice: (0, pg_core_1.doublePrecision)("sellingPrice").notNull(),
}, (table) => {
    return {
        productVariantProductIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.productId],
            foreignColumns: [exports.product.id],
            name: "ProductVariant_productId_fkey",
        })
            .onDelete("cascade")
            .onUpdate("cascade"),
        variantSkuIdx: (0, pg_core_1.index)("idx_variant_sku").on(table.sku),
        variantStockLocationIdx: (0, pg_core_1.index)("idx_variant_stock_location").on(table.stockByLocation),
        variantSearchIdx: (0, pg_core_1.index)("idx_variant_search").on(table.productId, table.potency, table.packSize),
        variantPriceIdx: (0, pg_core_1.index)("idx_variant_price").on(table.sellingPrice, table.mrp),
        variantPotencyIdx: (0, pg_core_1.index)("idx_variant_potency").on(table.potency),
        variantDiscountIdx: (0, pg_core_1.index)("idx_variant_discount").on(table.discount),
    };
});
exports.paymentMethod = (0, pg_core_1.pgTable)("PaymentMethod", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.PAYMENT),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
    paymentType: (0, exports.paymentType)("paymentType").notNull(),
    isDefault: (0, pg_core_1.boolean)("isDefault").default(false).notNull(),
    paymentDetails: (0, pg_core_1.jsonb)("paymentDetails").notNull(),
    displayDetails: (0, pg_core_1.jsonb)("displayDetails").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { precision: 3, mode: "date" })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { precision: 3, mode: "date" })
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => {
    return {
        paymentMethodUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "PaymentMethod_userId_fkey",
        })
            .onDelete("cascade")
            .onUpdate("cascade"),
        userPaymentMethodIndex: (0, pg_core_1.index)("PaymentMethod_userId_index").on(table.userId),
    };
});
exports.order = (0, pg_core_1.pgTable)("Order", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.ORDER),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
    orderDate: (0, pg_core_1.timestamp)("orderDate", {
        precision: 3,
        mode: "date",
    })
        .defaultNow()
        .notNull(),
    subtotal: (0, pg_core_1.doublePrecision)("subtotal").notNull(),
    shippingCost: (0, pg_core_1.doublePrecision)("shippingCost").default(0).notNull(),
    discount: (0, pg_core_1.doublePrecision)("discount").default(0).notNull(),
    tax: (0, pg_core_1.doublePrecision)("tax").default(0).notNull(),
    totalAmountPaid: (0, pg_core_1.doublePrecision)("totalAmountPaid").notNull(),
    orderType: (0, exports.orderType)("orderType").default("ONLINE").notNull(),
    deliveryStatus: (0, exports.deliveryStatus)("deliveryStatus")
        .default("PROCESSING")
        .notNull(),
    shippingAddressId: (0, pg_core_1.varchar)("shippingAddressId", { length: 32 }).notNull(),
    billingAddressId: (0, pg_core_1.varchar)("billingAddressId", { length: 32 }).notNull(),
    paymentStatus: (0, exports.paymentStatus)("paymentStatus").default("PENDING").notNull(),
    paymentIntentId: (0, pg_core_1.varchar)("paymentIntentId", { length: 100 }),
    invoiceNumber: (0, pg_core_1.varchar)("invoiceNumber", { length: 50 }),
    customerNotes: (0, pg_core_1.text)("customerNotes"),
    adminNotes: (0, pg_core_1.text)("adminNotes"),
    cancellationReason: (0, pg_core_1.text)("cancellationReason"),
    estimatedDeliveryDate: (0, pg_core_1.timestamp)("estimatedDeliveryDate", { mode: "date" }),
    deliveredAt: (0, pg_core_1.timestamp)("deliveredAt", { mode: "date" }),
    // payment method is mandatory, but not required for now.
    paymentMethodId: (0, pg_core_1.varchar)("paymentMethodId", { length: 32 }),
}, (table) => {
    return {
        orderUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "Order_userId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        orderShippingAddressFkey: (0, pg_core_1.foreignKey)({
            columns: [table.shippingAddressId],
            foreignColumns: [exports.address.id],
            name: "Order_shippingAddress_fkey",
        })
            .onUpdate("cascade")
            .onDelete("restrict"),
        orderBillingAddressFkey: (0, pg_core_1.foreignKey)({
            columns: [table.billingAddressId],
            foreignColumns: [exports.address.id],
            name: "Order_billingAddress_fkey",
        })
            .onUpdate("cascade")
            .onDelete("restrict"),
        orderPaymentMethodFkey: (0, pg_core_1.foreignKey)({
            columns: [table.paymentMethodId],
            foreignColumns: [exports.paymentMethod.id],
            name: "Order_paymentMethod_fkey",
        })
            .onUpdate("cascade")
            .onDelete("restrict"),
        orderDateStatusIdx: (0, pg_core_1.index)("order_date_status_idx").on(table.orderDate, table.deliveryStatus),
        orderUserDateIdx: (0, pg_core_1.index)("order_user_date_idx").on(table.userId, table.orderDate),
        orderPaymentStatusIdx: (0, pg_core_1.index)("order_payment_status_idx").on(table.paymentStatus),
        orderInvoiceNumberIdx: (0, pg_core_1.index)("order_invoice_number_idx").on(table.invoiceNumber),
        orderStatusIdx: (0, pg_core_1.index)("order_payment_delivery_status_idx").on(table.paymentStatus, table.deliveryStatus),
    };
});
exports.orderDetails = (0, pg_core_1.pgTable)("OrderDetails", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.ORDER_DETAILS),
    orderId: (0, pg_core_1.varchar)("orderId", { length: 32 }).notNull(),
    productVariantId: (0, pg_core_1.varchar)("productVariantId", { length: 32 }).notNull(),
    originalPrice: (0, pg_core_1.doublePrecision)("originalPrice").notNull(),
    discountAmount: (0, pg_core_1.doublePrecision)("discountAmount").default(0).notNull(),
    taxAmount: (0, pg_core_1.doublePrecision)("taxAmount").default(0).notNull(),
    unitPrice: (0, pg_core_1.doublePrecision)("unitPrice").notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    itemStatus: (0, exports.deliveryStatus)("itemStatus").default("PROCESSING").notNull(),
    returnReason: (0, pg_core_1.text)("returnReason"),
    returnedAt: (0, pg_core_1.timestamp)("returnedAt", { mode: "date" }),
    refundAmount: (0, pg_core_1.doublePrecision)("refundAmount"),
    fulfilledFromLocation: (0, exports.skuLocation)("fulfilledFromLocation"),
}, (table) => {
    return {
        orderDetailsOrderIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.orderId],
            foreignColumns: [exports.order.id],
            name: "OrderDetails_orderId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        orderDetailsProductVariantIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.productVariantId],
            foreignColumns: [exports.productVariant.id],
            name: "OrderDetails_productVariantId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        orderDetailsFulfillmentIdx: (0, pg_core_1.index)("order_details_fulfillment_idx").on(table.fulfilledFromLocation),
    };
});
exports.review = (0, pg_core_1.pgTable)("Review", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.REVIEW),
    rating: (0, pg_core_1.doublePrecision)("rating").default(0).notNull(),
    comment: (0, pg_core_1.text)("comment"),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
    productId: (0, pg_core_1.varchar)("productId", { length: 32 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { precision: 3, mode: "date" })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { precision: 3, mode: "date" })
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => {
    return {
        reviewUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "Review_userId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        reviewProductIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.productId],
            foreignColumns: [exports.product.id],
            name: "Review_productId_fkey",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        reviewRatingIdx: (0, pg_core_1.index)("review_rating_idx").on(table.rating),
        reviewProductDateIdx: (0, pg_core_1.index)("review_product_date_idx").on(table.productId, table.createdAt),
    };
});
exports.address = (0, pg_core_1.pgTable)("Address", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.ADDRESS),
    userId: (0, pg_core_1.varchar)("userId", { length: 32 }).notNull(),
    street: (0, pg_core_1.varchar)("street", { length: 255 }).notNull(),
    city: (0, pg_core_1.varchar)("city", { length: 100 }).notNull(),
    state: (0, pg_core_1.varchar)("state", { length: 100 }).notNull(),
    postalCode: (0, pg_core_1.varchar)("postalCode", { length: 10 }).notNull(),
    country: (0, pg_core_1.varchar)("country", { length: 50 }).default("India").notNull(),
    type: (0, exports.addressType)("addressType").default("SHIPPING").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { precision: 3, mode: "date" })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { precision: 3, mode: "date" })
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => {
    return {
        addressUserIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.userId],
            foreignColumns: [exports.user.id],
            name: "Address_userId_fkey",
        })
            .onDelete("cascade")
            .onUpdate("cascade"),
        userAddressIndex: (0, pg_core_1.index)("Adress_userId_index").on(table.userId),
    };
});
exports.inventoryManagement = (0, pg_core_1.pgTable)("InventoryManagement", {
    id: (0, exports.customId)("id", ENTITY_PREFIX.INVENTORY),
    productVariantId: (0, pg_core_1.varchar)("productVariantId", { length: 32 }).notNull(),
    orderId: (0, pg_core_1.varchar)("orderId", { length: 32 }),
    type: (0, exports.movementType)("type").notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    reason: (0, pg_core_1.text)("reason").notNull(),
    location: (0, exports.skuLocation)("location").notNull(),
    previousStock: (0, pg_core_1.integer)("previousStock").notNull(),
    newStock: (0, pg_core_1.integer)("newStock").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { mode: "date" }).defaultNow().notNull(),
    createdBy: (0, pg_core_1.varchar)("createdBy", { length: 32 }).notNull(),
}, (table) => ({
    inventoryManagementVariantFkey: (0, pg_core_1.foreignKey)({
        columns: [table.productVariantId],
        foreignColumns: [exports.productVariant.id],
    })
        .onDelete("restrict")
        .onUpdate("cascade"),
    inventoryMovementOrderFkey: (0, pg_core_1.foreignKey)({
        columns: [table.orderId],
        foreignColumns: [exports.order.id],
    })
        .onDelete("set null")
        .onUpdate("cascade"),
    inventoryMovementUserFkey: (0, pg_core_1.foreignKey)({
        columns: [table.createdBy],
        foreignColumns: [exports.user.id],
    })
        .onDelete("restrict")
        .onUpdate("cascade"),
    productVariantIdx: (0, pg_core_1.index)("idx_inventory_movement_variant").on(table.productVariantId),
    dateIdx: (0, pg_core_1.index)("idx_inventory_movement_date").on(table.createdAt),
    orderIdx: (0, pg_core_1.index)("idx_inventory_movement_order").on(table.orderId),
    locationIdx: (0, pg_core_1.index)("idx_inventory_movement_location").on(table.location),
}));
exports.tag = (0, pg_core_1.pgTable)("Tags", {
    id: (0, exports.customId)("id", "TAG"),
    name: (0, pg_core_1.text)("name").notNull(),
});
