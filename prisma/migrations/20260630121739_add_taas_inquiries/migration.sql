-- CreateTable
CREATE TABLE `taas_inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `services` JSON NULL,
    `weekly_hours` INTEGER NULL,
    `duration_type` VARCHAR(20) NULL,
    `months` INTEGER NULL,
    `skill_level` VARCHAR(20) NULL,
    `message` TEXT NULL,
    `line_items` JSON NULL,
    `discount_cents` INTEGER NOT NULL DEFAULT 0,
    `total_cents` INTEGER NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `taas_inquiries_email_idx`(`email`),
    INDEX `taas_inquiries_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
