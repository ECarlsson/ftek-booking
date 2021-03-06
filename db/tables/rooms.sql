CREATE TABLE IF NOT EXISTS `rooms` (
    `id` INTEGER UNSIGNED AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `manager` INTEGER UNSIGNED DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `room_manager` FOREIGN KEY (`manager`) REFERENCES `users`(`id`)
);