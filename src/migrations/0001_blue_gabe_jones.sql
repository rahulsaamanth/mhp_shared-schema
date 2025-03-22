DROP INDEX "order_details_status_idx";--> statement-breakpoint
DROP INDEX "idx_variant_costPrice";--> statement-breakpoint
DROP INDEX "idx_variant_sellingPrice";--> statement-breakpoint
CREATE INDEX "order_payment_delivery_status_idx" ON "Order" USING btree ("paymentStatus","deliveryStatus");--> statement-breakpoint
CREATE INDEX "product_category_status_idx" ON "Product" USING btree ("categoryId","status");--> statement-breakpoint
CREATE INDEX "idx_variant_price" ON "ProductVariant" USING btree ("sellingPrice","mrp");--> statement-breakpoint
CREATE INDEX "idx_variant_potency" ON "ProductVariant" USING btree ("potency");--> statement-breakpoint
CREATE INDEX "idx_variant_discount" ON "ProductVariant" USING btree ("discount");--> statement-breakpoint
CREATE INDEX "review_rating_idx" ON "Review" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "review_product_date_idx" ON "Review" USING btree ("productId","createdAt");